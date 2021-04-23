import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../features/results/resultsSlice';

export const store = configureStore({
  reducer: {
    results: resultsReducer,
  },
});
