import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../database/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Импортируем метод

import '../css/login.css'; // Импортируем стили

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Новое состояние для успешного сообщения
    const navigate = useNavigate(); // Хук для навигации

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful:', userCredential.user);
            
            // Обновляем сообщение об успешной авторизации
            setSuccessMessage('Вход выполнен успешно!');

            setTimeout(() => {
                navigate('/userprofile'); // перенаправление пользователя на его профиль
            }, 2000); // Ожидание 2 секунды для показа сообщения
        } catch (error: any) {
            console.error('Login error:', error);
            setError('Ошибка входа: ' + error.message);
        }
    };

    return (
        <div>
            <div className="login-container">
                <h2>Вход</h2>
                <div className="login-input-container">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="login-input-container">
                    <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className="login-error-message">{error}</p>}
                {successMessage && <p className="login-success-message">{successMessage}</p>} {/* Отображение сообщения об успешном входе */}
                <div className="login-button-container">
                    <button onClick={handleLogin}>Войти</button>
                </div>
                <div className="login-link-container">
                    <p>Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
