import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../database/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Импортируем метод
import { addUser } from '../database/firebase'; // Импортируем функцию добавления пользователя

import '../css/registration.css'

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegistration = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('Registration successful:', userCredential.user);

            // Добавляем пользователя в базу данных
            await addUser({ email: userCredential.user.email, uid: userCredential.user.uid });

            // Перенаправляем пользователя на страницу входа
            navigate('/userprofile');
        } catch (error: any) {
            console.error('Registration error:', error);
            setError('Ошибка регистрации: ' + error.message);
        }
    };

    return (
        <div>
            <div className="registration-container">
                <h2>Регистрация</h2>
                <div className="registration-input-container">
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="registration-input-container">
                    <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="registration-button-container">
                    <button onClick={handleRegistration}>Зарегистрироваться</button>
                </div>
                <div className="registration-link-container">
                    <p>Уже зарегистрированы? <Link to="/login">Войти</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;
