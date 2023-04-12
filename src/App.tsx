import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import TodoList from '@pages/TodoList';
import FormEmailPassword from '@pages/FormEmailPassword';
import ProtectedRoute from '@components/Route/ProtectedRoute';

function App() {
  const getAccessToken = () => localStorage.getItem('accessToken');

  return (
    <Routes>
      <Route path="/signup" element={getAccessToken() ? <Navigate to="/todo" replace /> : <FormEmailPassword />} />
      <Route path="/signin" element={getAccessToken() ? <Navigate to="/todo" replace /> : <FormEmailPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/todo" element={<TodoList />} />
      </Route>
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default App;
