import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchTenses
} from './tensesAPI';

const initialState = {
  tenses: {},
  tense: '',
  language: null,
  explanations: {
      "condicional simple": "The conditional tense (condicional simple de indicativo) in Spanish is mainly used to express hypothetical situations and actions as well as for polite requests and wishes.",
      "futuro perfecto": "The Spanish future perfect is used just like its English counterpart: to indicate an action that will have taken place before another action or point in the future.",
      "futuro simple": "The futuro simple is used to express: an upcoming (future) action, or an intention, a prediction about the future, a probability or possibility",
      "gerundio": "verb forms ending in -ando or -iendo , e.g. 'hablando', are called gerundios (gerunds). These special verb forms are known as verbals because these words no longer act like verbs in sentences - they have no subject. Instead they act like adjectives or adverbs.",
      "imperativo": "El imperativo (the Spanish imperative) is a verbal form that speakers use to give orders, advice or make requests and suggestions to one or more people directly. ... Also, it must be noted that all imperative forms are conjugated without personal pronoun and only used in reference to the present, same as in English.",
      "imperfecto": "The imperfect (imperfecto) is one of the two simple past tenses in Spanish. It is used for ongoing or recurrent actions in the past. It is also used for descriptions, states of being, and for providing background information about the past.",
      "infinitivo": "The infinitive (el infinitivo) is the basic form of a verb that you find when you look it up in a dictionary. It is a non-finite (or 'in-finite', hence infinitive) verb form (like participles and gerunds), which means that it has no expressed or implied subject and shows no tense.",
      "participio": "A past participle, participio, is a special form of a verb mainly used in compound tenses where it follows haber, ser or estar conjugated in a specific tense, e.g. 'he comido'.",
      "pluscuamperfecto": "Pluscuamperfecto (or pluperfect in English) is used to describe events or actions that have happened further back in the past than a past action we are referring to. If you think about it in English, it would be something like: When I got home yesterday, my mom had already left for work.",
      "presente": "The present indicative or el presente/el presente de indicativo is similar to the simple present tense in English grammar. We use this to tense to speak about actions in the present and near future. It describes routine or repeated actions as well as permanent situations.",
      "pretérito": "The pretérito is the Spanish simple past tense, used to talk about things that were completed in the past.",
      "pretérito perfecto": "Pretérito perfecto (perfect tense) is used for actions completed in the recent past that have a connection to the present. This tense is similar to the English present perfect tense and is conjugated with the auxiliary verb haber + past participle.",
    },
  status: 'idle',
};



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getTenses = createAsyncThunk(
  'tenses/fetchTenses',
  async (language) => {
    const response = await fetchTenses(language);
    // The value we return becomes the `fulfilled` action payload
    return response.data || [];
  }
);

export const tensesSlice = createSlice({
  name: 'tenses',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTense: (state, action) => {
      state.tense = action.payload;
    },
    setTenseLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getTenses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTenses.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tenses = action.payload;
      })
  },

});

export const selectTenses = (state) => state.tenses.tenses;
export const selectTense = (state) => state.tenses.tense;
export const selectTenseLanguage = (state) => state.tenses.language;
export const selectExplanations = (state) => state.tenses.explanations;
export const { setTense, setTenseLanguage } = tensesSlice.actions;
export const selectTensesStatus = (state) => state.tenses.status;
export default tensesSlice.reducer;
