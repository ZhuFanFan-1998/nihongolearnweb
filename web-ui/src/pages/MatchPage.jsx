import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import LoadingSpinner from '../components/LoadingSpinner';
import socket from  "../socket/socket";

function MatchPage() {
    const navigate = useNavigate();
    const { name, setOpponent } = useUser();

    useEffect(() => {
        socket.emit("joinMatch", { name });

        socket.on("matchFound", (opponent) => {
            setOpponent(opponent);
            navigate("/game");
        });

        return () => {
            socket.off("matchFound");
        };
    }, [name]);

    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1> ... </h1>
            <LoadingSpinner />
        </div>
    );

};

export default MatchPage;