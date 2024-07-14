// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import HomePage from './main-pages/Home';
import RegistrationPage from './validation/Registration';
import LoginPage from './validation/Login';
import Instruction from './main-pages/Instruction';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path='/instruction' element={<Instruction />} />
          <Route path='/userprofile' element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
