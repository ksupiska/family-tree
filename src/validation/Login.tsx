// LoginPage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../database/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth'; // Импортируем метод

import '../css/login.css'; // Импортируем стили

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login successful:', userCredential.user);
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
