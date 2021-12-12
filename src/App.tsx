import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './components/Home';
import NoMatch from './components/NoMatch';
import RegisterPage from './components/auth/Register';
import LoginPage from './components/auth/Login';
import DefaultLayout from './components/containers/DefaultLayout';
import ProfilePage from './components/userView/Profile';
import AllAutos from './components/userView/Product/showAll';
import ShowAuto from './components/userView/Product/showAuto';
import { useTypedSelector } from './hooks/useTypedSelector';

function App() {
  const { isAuth } = useTypedSelector(state => state.auth);
  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          {isAuth ?
            <>
              <Route path="/profile" element={<ProfilePage />}></Route>
              <Route path="/autos" element={<AllAutos />}></Route>
              <Route path="/auto" element={<ShowAuto />}></Route>
            </> : <></>
          }
          <Route path="*" element={<NoMatch />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
