import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import TodoList from '@pages/TodoList';
import FormEmailPassword from '@pages/FormEmailPassword';

function App() {
  const getAccessToken = () => {
    const accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
    return accessToken;
  };

  return (
    <Routes>
      <Route path="/todo" element={<TodoList />} />
      <Route path="/signup" element={getAccessToken() ? <Navigate to="/todo" replace /> : <FormEmailPassword />} />
      <Route path="/signin" element={getAccessToken() ? <Navigate to="/todo" replace /> : <FormEmailPassword />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default App;
