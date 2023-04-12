import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import TodoList from '@pages/TodoList';
import FormEmailPassword from '@pages/FormEmailPassword';
import ProtectedRoute from '@components/Route/ProtectedRoute';
import CheckAuthRoute from '@components/Route/CheckAuthRoute';

function App() {
  return (
    <Routes>
      <Route element={<CheckAuthRoute />}>
        <Route path="/signup" element={<FormEmailPassword />} />
        <Route path="/signin" element={<FormEmailPassword />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/todo" element={<TodoList />} />
      </Route>
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default App;
