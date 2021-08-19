import { configureStore } from '@reduxjs/toolkit';
import gramsReducer from '../features/grams/gramsSlice';
import mediaReducer from '../features/media/mediaSlice';
import mediasReducer from '../features/medias/mediasSlice';
import resultsReducer from '../features/results/resultsSlice';
import resultReducer from '../features/result/resultSlice';
import tensesReducer from '../features/tenses/tensesSlice';
import verbsReducer from '../features/verbs/verbsSlice';
import verbReducer from '../features/verb/verbSlice';
import playerReducer from '../features/player/playerSlice';
import explorerReducer from '../features/explorer/explorerSlice';
import languageReducer from '../features/language/languageSlice';

export const store = configureStore({
  reducer: {
    grams: gramsReducer,
    language: languageReducer,
    media: mediaReducer,
    medias: mediasReducer,
    tenses: tensesReducer,
    verbs: verbsReducer,
    verb: verbReducer,
    results: resultsReducer,
    result: resultReducer,
    player: playerReducer,
    explorer: explorerReducer
  },
});
