import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

function HomePage() {
    const navigate = useNavigate();
    const { name, setName } = useUser();

    const handleStart = () => {
        if (!name.trim()) {
            alert('ニックネームを入力してください^^');
            return;
        }

        navigate('/menu', {
            state: { userName: name }}
        );
        
    };


    return (
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1> 日本語 PK </h1>
            <input
            type="text"
            value={name}
            placeholder="请输入昵称"
            onChange={(e) => setName(e.target.value)}
            style={{ padding: '8px', fontSize: '16px', marginBottom: '16px' }}
            />
            <br />
            <button onClick={handleStart} style={{ padding: '10px 20px' }}>
            开始匹配
            </button>
        </div>
    );

};

export default HomePage;

