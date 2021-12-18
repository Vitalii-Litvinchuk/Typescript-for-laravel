import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './components/Home';
import NoMatch from './components/NoMatch';
import RegisterPage from './components/auth/Register';
import LoginPage from './components/auth/Login';
import DefaultLayout from './components/containers/DefaultLayout';
import ProfilePage from './components/userView/Profile';
import AllProducts from './components/userView/Product/showAll';
import { useTypedSelector } from './hooks/useTypedSelector';
import ShowProduct from './components/userView/Product/showProduct';
import CreateProduct from './components/userView/Product/Create';

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
              <Route path="/autos" element={<AllProducts />}></Route>
              <Route path="/auto" element={<ShowProduct />}></Route>
              <Route path="/auto/create" element={<CreateProduct />}></Route>
            </> : <></>
          }
          <Route path="*" element={<NoMatch />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
