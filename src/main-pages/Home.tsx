import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, getUserById } from '../database/firebase';
import '../css/home.css'; // Импортируем стили

const HomePage = () => {
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRegistration = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userData = await getUserById(user.uid);
          if (userData) {
            setIsRegistered(true);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    checkRegistration();
  }, []);

  const handleRegisterClick = () => {
    navigate('/registration');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div>
      <div className='home-container'>
        <h1>Добро пожаловать на сайт для создания генеалогического дерева!</h1>
        <p>Здесь вы можете создать свою собственную династию Sims 4.</p>
        <div className='home-buttons'>
          {!isRegistered ? (
            <button onClick={handleRegisterClick} className="home-btn">Зарегистрироваться</button>
          ) : (
            <button onClick={handleLoginClick} className="home-btn">Войти</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
