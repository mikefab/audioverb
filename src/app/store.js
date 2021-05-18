import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../features/results/resultsSlice';
import tensesReducer from '../features/tenses/tensesSlice';
import verbsReducer from '../features/verbs/verbsSlice';
import conjugationReducer from '../features/conjugation/conjugationSlice';
import playerReducer from '../features/player/playerSlice';
import explorerReducer from '../features/explorer/explorerSlice';

export const store = configureStore({
  reducer: {
    tenses: tensesReducer,
    verbs: verbsReducer,
    conjugation: conjugationReducer,
    results: resultsReducer,
    player: playerReducer,
    explorer: explorerReducer
  },
});
