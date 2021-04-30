import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../features/results/resultsSlice';
import playerReducer from '../features/player/playerSlice';

export const store = configureStore({
  reducer: {
    results: resultsReducer,
    player: playerReducer,
  },
});
