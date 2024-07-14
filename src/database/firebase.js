import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, push, remove, update, get, child, onValue } from "firebase/database";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWRHNBV3HEE2Dcrt00kL_iYuAZbMOZXzE",
  authDomain: "famile-tree.firebaseapp.com",
  projectId: "famile-tree",
  storageBucket: "famile-tree.appspot.com",
  messagingSenderId: "302805866953",
  appId: "1:302805866953:web:38aa7cc8c98133a99e7018",
  measurementId: "G-PR67S4XKT2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authInstance = getAuth(app); // Получаем auth из нашего приложения
const database = getDatabase(app);
const storage = getStorage(app); // Добавляем и экспортируем storage

export { authInstance as auth, database, storage }; // Экспортируем authInstance как auth для использования в других частях вашего приложения

// Функция для добавления пользователя
export const addUser = (userData) => {
  const usersRef = ref(database, 'users');

  // Добавляем нового пользователя в базу данных
  return push(usersRef, userData)
    .then((newUserRef) => {
      console.log("User added successfully with ID: ", newUserRef.key);
      return newUserRef.key; // Возвращаем ключ нового пользователя, если нужно
    })
    .catch((error) => {
      console.error("Error adding user: ", error);
      throw error; // Пробрасываем ошибку для обработки в другом месте
    });
};

// Функция для удаления пользователя
export const deleteUser = (userId) => {
  const userRef = ref(database, `users/${userId}`);

  // Удаляем пользователя из базы данных
  return remove(userRef)
    .then(() => {
      console.log(`User with ID ${userId} deleted successfully`);
    })
    .catch((error) => {
      console.error(`Error deleting user with ID ${userId}: `, error);
      throw error; // Пробрасываем ошибку для обработки в другом месте
    });
};

// Функция для обновления данных пользователя
export const updateUser = (userId, updates) => {
  const userRef = ref(database, `users/${userId}`);

  // Обновляем данные пользователя в базе данных
  return update(userRef, updates)
    .then(() => {
      console.log(`User with ID ${userId} updated successfully`);
    })
    .catch((error) => {
      console.error(`Error updating user with ID ${userId}: `, error);
      throw error; // Пробрасываем ошибку для обработки в другом месте
    });
};

// Функция для получения списка пользователей
export const getUsers = () => {
  const usersRef = ref(database, 'users');

  // Получаем список пользователей из базы данных
  return get(usersRef)
    .then((snapshot) => {
      const usersList = [];
      snapshot.forEach((childSnapshot) => {
        usersList.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      return usersList;
    })
    .catch((error) => {
      console.error("Error getting users: ", error);
      throw error; // Пробрасываем ошибку для обработки в другом месте
    });
};

// Функция для получения пользователя по ID
export const getUserById = (userId) => {
  const userRef = ref(database, `users/${userId}`);

  // Получаем пользователя из базы данных по его ID
  return get(userRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        return {
          id: snapshot.key,
          ...snapshot.val()
        };
      } else {
        console.log(`User with ID ${userId} not found`);
        return null;
      }
    })
    .catch((error) => {
      console.error(`Error getting user with ID ${userId}: `, error);
      throw error; // Пробрасываем ошибку для обработки в другом месте
    });
};

// Пример использования функций
// addUser({ name: "John Doe", age: 30 }).then((userId) => {
//   console.log("User added with ID:", userId);
// });

// deleteUser("userId123").then(() => {
//   console.log("User deleted successfully");
// });

// updateUser("userId123", { age: 31 }).then(() => {
//   console.log("User updated successfully");
// });

// getUsers().then((usersList) => {
//   console.log("Users:", usersList);
// });

// getUserById("userId123").then((user) => {
//   console.log("User:", user);
// });