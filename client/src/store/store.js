import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import thunk from 'redux-thunk';

import authSlice from './reducers/authSlice';
import profileSlice from './reducers/profileSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;