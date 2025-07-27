const waitingUsers = [];
// マッチ
function match(wsServer) {
    // 当有客户端连接时触发
    wsServer.on("connection", (socket) => {
        console.log("Client connected");
        // 匹配超时的定时器
        let matchTimeout;
        // 开始匹配
        socket.on("message", (message) => {
            let data;
            try {
                data = JSON.parse(message);
            } catch (error) {
                console.error("Invalid JSON:", message);
                return;
            }

            if (data.type == "startMatch") {
                const userInfo = data.userInfo;
                console.log("Received startMatch:", userInfo);
                if (!userInfo || !userInfo.name) {
                    socket.send(
                        JSON.stringify({
                            type: "error",
                            message: "ニックネームを入力してください^^",
                        })
                    );
                    return;
                }
                // 避免重复加入
                if (!waitingUsers.includes(socket)) {
                    waitingUsers.push({ socket, userInfo });
                    // 设置10秒超时
                    matchTimeout = setTimeout(() => {
                        const idx = waitingUsers.findIndex(
                            (u) => u.socket === socket
                        );
                        if (idx !== -1) {
                            waitingUsers.splice(idx, 1);
                            socket.send(
                                JSON.stringify({
                                    type: "error",
                                    message: "マッチングタイムアウトしました(っ °Д °;)っ",
                                })
                            );
                        }
                    }, 10000);
                }

                // 如果有足够的用户进行匹配
                if (waitingUsers.length >= 2) {
                    const user1 = waitingUsers.shift();
                    const user2 = waitingUsers.shift();

                    const type = "matched";
                    const questions = ["Question1", "Question2"]; // 示例问题

                    user1.socket.send(
                        JSON.stringify({
                            opponent: user2.userInfo,
                            questions,
                            type,
                        })
                    );
                    user2.socket.send(
                        JSON.stringify({
                            opponent: user1.userInfo,
                            questions,
                            type,
                        })
                    );
                    clearTimeout(matchTimeout); // 清除匹配超时定时器
                    console.log(
                        `Matched ${user1.userInfo.name} with ${user2.userInfo.name}`
                    );
                }
            } else if (data.type === "cancelMatch") {
                const idx = waitingUsers.findIndex((u) => u.socket === socket);
                if (idx !== -1) {
                    waitingUsers.splice(idx, 1);
                    clearTimeout(matchTimeout);
                }
            }
        });

        // 当有客户端断开连接时触发
        socket.on("close", () => {
            console.log("Client disconnected");
            clearTimeout(matchTimeout);
            const idx = waitingUsers.findIndex((u) => u.socket === socket);
            if (idx !== -1) {
                waitingUsers.splice(idx, 1);
                socket.send(JSON.stringify({
                    type: "error",
                    message: "接続が失われました(╯▔皿▔)╯",
                }));
            }
        });
    });
}

module.exports = match;
