import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../features/results/resultsSlice';
import tensesReducer from '../features/tenses/tensesSlice';
import playerReducer from '../features/player/playerSlice';

export const store = configureStore({
  reducer: {
    tenses: tensesReducer,
    results: resultsReducer,
    player: playerReducer,
  },
});
