import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../features/results/resultsSlice';
import resultReducer from '../features/result/resultSlice';
import tensesReducer from '../features/tenses/tensesSlice';
import verbsReducer from '../features/verbs/verbsSlice';
import verbReducer from '../features/verb/verbSlice';
import playerReducer from '../features/player/playerSlice';
import explorerReducer from '../features/explorer/explorerSlice';

export const store = configureStore({
  reducer: {
    tenses: tensesReducer,
    verbs: verbsReducer,
    verb: verbReducer,
    results: resultsReducer,
    result: resultReducer,
    player: playerReducer,
    explorer: explorerReducer
  },
});
