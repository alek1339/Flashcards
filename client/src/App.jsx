import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { logoutUser, tokenLogin } from "./store/reducers/authSlice";
import { getProfile } from "./store/reducers/profileSlice";

import { getDecks } from "./store/reducers/deckSlice";

import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";

import "./App.scss";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import CreateProfile from "./pages/createProfile/CreateProfile";
import ForgottenPassword from "./pages/forgottenPassword/ForgottenPassword";
import PasswordResetPage from "./pages/passwordResetPage/PasswordResetPage";
import Create from "./pages/create/Create";
import StudyDeck from "./pages/studyDeck/StudyDeck";
import ReviewDeck from "./pages/reviewDeck/ReviewDeck";
import AuthenticatedRoute from "./components/authenticatedRoute/AuthenticatedRoute";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  useEffect(() => {
    const token = Cookies.get("authToken");
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

  useEffect(() => {
    if (user) {
      dispatch(getDecks(user._id));
    }
  });

  return (
    <>
      <BrowserRouter>
        <header></header>

        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/decks/:deckId/study"
              element={
                <AuthenticatedRoute>
                  <StudyDeck />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/decks/:deckId/review"
              element={
                <AuthenticatedRoute>
                  <ReviewDeck />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <AuthenticatedRoute>
                  <Create />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/create-profile"
              element={
                <AuthenticatedRoute>
                  <CreateProfile />
                </AuthenticatedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthenticatedRoute>
                  <Profile />
                </AuthenticatedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotten-password" element={<ForgottenPassword />} />
            <Route
              path="/reset-password/:token"
              element={<PasswordResetPage />}
            />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
