// Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css'

const Header = () => {
    return (
        <div className="header">
            <Link to="/" className="logo">Главная</Link>
        </div>
    );
};

export default Header;
