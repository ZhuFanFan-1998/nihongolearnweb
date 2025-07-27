import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LoadingSpinner from '../components/LoadingSpinner';

function MatchPage() {
    const navigate = useNavigate();
    const { name, setOpponent } = useUser();

    useEffect(() => {
        const wsUrl = `ws://${import.meta.env.VITE_WS_HOST}:${import.meta.env.VITE_WS_PORT}${import.meta.env.VITE_WS_PATH_PK}`;
        let ws = new WebSocket(wsUrl);
        // 通过命令行输入消息并发送给服务器
        ws.onopen = () => {
            ws.send(JSON.stringify({ type: 'startMatch', userInfo: { name } }));
        };
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'matched') {
                setOpponent(data.opponent);
                navigate('/game', { state: { opponent: data.opponent, questions: data.questions } });
            } else if (data.type === 'error') {
                alert(data.message);
                navigate('/menu');
            }
        };

        return () => {
            ws.close();
        };
    }, [name, navigate, setOpponent]);

    const handleCancel = () => {
        // Logic to cancel the match can be added here
        alert('マッチングをキャンセルしました。');
        navigate('/menu');
    }

    return (
        <div>
            <div> {name} さん、少々お待ちください </div>
            <div> 対戦相手とマッチングしています... </div>
            <LoadingSpinner />
            <button className="cancel-button" onClick={handleCancel}>
                キャンセル
            </button>
        </div>
    );

};

export default MatchPage;