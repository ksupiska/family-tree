import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { addUser, updateUser, getUserById } from '../database/firebase'; // Импортируем функции
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'; // Импортируем функции Firebase Storage
import { storage } from '../database/firebase'; // Импортируем настроенный storage

import '../css/userProfile.css';

const UserProfile = () => {
  const [avatar, setAvatar] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>(''); // ID пользователя, который нужно получить
  const [isLoading, setIsLoading] = useState<boolean>(true); // Добавлено для контроля состояния загрузки
  const navigate = useNavigate();

  const getCurrentUserId = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    return user ? user.uid : null;
  };

  useEffect(() => {
    // Проверка аутентификации пользователя
    const checkUserAuth = async () => {
      const currentUserId = await getCurrentUserId();
      if (!currentUserId) {
        navigate('/login'); // Перенаправление на страницу входа, если пользователь не аутентифицирован
      } else {
        setUserId(currentUserId);
        await loadUserData(currentUserId);
        setIsLoading(false); // Завершение загрузки данных
      }
    };

    checkUserAuth();
  }, [navigate]);

  const loadUserData = async (userId: string) => {
    const userData = await getUserById(userId);
    if (userData) {
      setAvatar(userData.avatar || '');
      setName(userData.name || '');
      setDob(userData.dob || '');
      setDescription(userData.description || '');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatarFile(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let avatarUrl = avatar;
      if (avatarFile) {
        const fileRef = storageRef(storage, `avatars/${new Date().getTime()}_${avatarFile.name}`);
        await uploadBytes(fileRef, avatarFile);
        avatarUrl = await getDownloadURL(fileRef);
      }

      const userData = {
        avatar: avatarUrl,
        name,
        dob,
        description
      };

      if (userId) {
        await updateUser(userId, userData);
      } else {
        const newUserId = await addUser(userData);
        setUserId(newUserId || '');
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Ошибка при сохранении профиля:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigate('/login'); // Перенаправление на страницу входа после выхода
  };

  return (
    <div className='user-profile'>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className='form-profile'>
            <div className='avatar-container'>
              <label htmlFor="avatar" className='avatar-label'>
                Выберите аватар
              </label>
              <input
                name='avatar'
                id='avatar'
                type="file"
                accept="image/*"
                className='avatar-input'
                onChange={handleFileChange}
              />
              <img src={avatar || '/default-avatar.png'} alt="Avatar" className="avatar-preview" />
              {isEditing && (
                <button className='avatar-upload-button' onClick={() => document.getElementById('avatar')?.click()}>
                  Загрузить новый аватар
                </button>
              )}
            </div>
            <input
              placeholder='Введите ваше имя'
              name='name'
              id='name'
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="date">
              Выберите дату рождения
            </label>
            <input
              name='date'
              id='date'
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <textarea
              placeholder='Введите описание'
              name='description'
              id='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button className='button-save' type='submit'>Сохранить</button>
          </div>
        </form>
      ) : (
        <div className='profile-view'>
          <img src={avatar || '/default-avatar.png'} alt="Avatar" className="avatar-img" />
          <section>
            <p><strong>Имя:</strong> {name}</p>
            <p><strong>Дата рождения:</strong> {dob}</p>
            <p><strong>Описание:</strong> {description}</p>
            <button className='button-edit' onClick={handleEdit}>Редактировать профиль</button>
          </section>
        </div>
      )}
      <button className='button-logout' onClick={handleLogout}>Выйти</button>
    </div>
  );
};

export default UserProfile;
