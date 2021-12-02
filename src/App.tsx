import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './components/Home';
import NoMatch from './components/NoMatch';
import RegisterPage from './components/auth/Register';
import LoginPage from './components/auth/Login';
import DefaultLayout from './components/containers/DefaultLayout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route path="*" element={<NoMatch />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
