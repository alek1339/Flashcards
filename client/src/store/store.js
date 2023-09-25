import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import thunk from 'redux-thunk';

import authSlice from './reducers/authSlice';
import profileSlice from './reducers/profileSlice';
import deckSlice from './reducers/deckSlice';
import cardSlice from './reducers/cardSlice';
import reviewSlice from './reducers/reviewSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  profile: profileSlice,
  deck: deckSlice,
  card: cardSlice,
  review: reviewSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export default store;