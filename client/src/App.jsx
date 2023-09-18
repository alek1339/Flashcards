import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import { logoutUser, tokenLogin } from './store/reducers/authSlice';
import { getProfile } from './store/reducers/profileSlice';

import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';

import './App.scss';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        dispatch(logoutUser());
      }

      // TODO: dispatch the loginUser action with the token
      dispatch(tokenLogin({ token }));

    } else {
      dispatch(logoutUser());
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getProfile(user._id));
    }
  }, [user, dispatch]);

  return (
    <>
     <BrowserRouter>
        <header>
         
        </header>

        <main>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            </Routes>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App;
