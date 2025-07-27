import { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'; // 样式文件，稍后定义
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const API_URL = `http://${import.meta.env.VITE_WS_HOST}:${import.meta.env.VITE_WS_PORT}/api`; // 后端 API 地址

function HomePage() {
    const [form, setForm] = useState({ name: '', learnAmount: '', winAmount: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate(); // 用于跳转
    const { name, setName } = useUser();

    // 获取所有用户
    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    // 处理输入变化
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setError(''); // 清空错误
        setSuccess(''); // 清空成功消息
    };

    // 提交表单
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 简单验证
        if (!form.name) {
            setError('名前を入力してください！');
            return;
        }

        // 判断用户是否存在
        const exists = users.some(user => user.name === form.name);
        if (exists) {
            alert(`${form.name}が登録されました！`);
            setName(form.name);
            navigate('/menu'); // 跳转至菜单
            return;
        }

        // 判断是否创建
        console.log('Showing confirm dialog for:', form.name); // 调试确认框
        const shouldCreate = window.confirm(`${form.name} は登録されていません。新しいユーザーを作成しますか？`);
        if (!shouldCreate) {
            alert('ユーザー作成がキャンセルされました。');
            return;
        }

        // 开始创建新用户
        try {
            const response = await axios.post(`${API_URL}/users`, {
                name: form.name,
                learnAmount: 0,
                winAmount: 0,
            });
            setSuccess('成功しました!');
            setForm({ name: '', learnAmount: '', winAmount: '' }); // 清空表单
            fetchUsers(); // 刷新用户列表
        } catch (err) {
            setError(err.response?.data?.error || '登録に失敗しました。もう一度お試しください。');
        }
    };

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">なまえ:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="名前を入力してください"
                    />
                </div>

                {error && <p className="error">{error}</p>}
                {success && <p className="success fade-out">{success}</p>}
                <button className='fancy-btn' type="submit">始めましょう</button>
            </form>
            <div className="List">
                <h2>ユーザー一覧: </h2>
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            <h2>{user.name}</h2> {/* (学ぶの数目: {user.learnAmount}, 勝つの回数: {user.winAmount}) */}
                            {/* <button onClick={() => deleteUser(user.name)}>Delete</button> */}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;

