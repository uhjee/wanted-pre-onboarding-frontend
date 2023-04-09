import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Signin from './Templates/Signin';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default App;
