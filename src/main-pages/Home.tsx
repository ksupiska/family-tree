import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import '../css/home.css'; // Импортируем стили

const HomePage = () => {
  return (
    <div>
      <Header/>
      <div className='home-container'> {/* Изменили на уникальный класс */}
        <h1>Добро пожаловать на сайт для создания генеалогического дерева!</h1>
        <p>Здесь вы можете создать свою собственную династию Sims 4.</p>
        <div className='home-buttons'> {/* Изменили на уникальный класс */}
          <Link to="/registration" className="home-btn">Зарегистрироваться</Link>
          <Link to="/login" className="home-btn">Войти</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
