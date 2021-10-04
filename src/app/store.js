import { configureStore } from '@reduxjs/toolkit';
import chengyuReducer from '../features/chengyu/chengyuSlice';
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
import idiomsReducer from '../features/idioms/idiomsSlice';
import duanyuReducer from '../features/duanyu/duanyuSlice';
import prepositionsReducer from '../features/prepositions/prepositionsSlice';
export const store = configureStore({
  reducer: {
    chengyu: chengyuReducer,
    grams: gramsReducer,
    idioms: idiomsReducer,
    duanyu: duanyuReducer,
    language: languageReducer,
    media: mediaReducer,
    medias: mediasReducer,
    tenses: tensesReducer,
    verbs: verbsReducer,
    verb: verbReducer,
    results: resultsReducer,
    result: resultReducer,
    player: playerReducer,
    explorer: explorerReducer,
    prepositions: prepositionsReducer
  },
});
