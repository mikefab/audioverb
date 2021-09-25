import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchVerbs,
  fetchVerbsByTense,
  fetchVerbsByMedia
} from './verbsAPI';

const initialState = {
  verbs: {},
  language: null,
  media: null,
  status: 'idle',
};



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

export const getVerbs = createAsyncThunk(
  'verbs/fetchVerbs',
  async (lng) => {
    const response = await fetchVerbs(lng);
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);

export const getVerbsByTense = createAsyncThunk(
  'verbs/fetchVerbsByTense',
  async (tense) => {
    const response = await fetchVerbsByTense(tense);
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);

export const getVerbsByMedia = createAsyncThunk(
  'verbs/fetchVerbsByMedia',
  async (media) => {
    const response = await fetchVerbsByMedia(media);
    // The value we return becomes the `fulfilled` action payload
    return response.data
  }
);

export const verbsSlice = createSlice({
  name: 'verbs',
  initialState,
  reducers: {
    setVerbLanguage: (state, action) => {
      state.language = action.payload;
    },
    setVerbMedia: (state, action) => {
      state.media = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getVerbs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVerbs.fulfilled, (state, action) => {
        state.status = 'idle';
        state.verbs = action.payload;
      })
      .addCase(getVerbsByTense.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVerbsByTense.fulfilled, (state, action) => {
        state.status = 'idle';
        state.verbs = action.payload;
      })
      .addCase(getVerbsByMedia.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getVerbsByMedia.fulfilled, (state, action) => {
        state.status = 'idle';
        state.verbs = action.payload;
      })

  },
});

export const selectVerbs = (state) => state.verbs.verbs;
export const selectVerbLanguage = (state) => state.verbs.language;
export const selectVerbMedia = (state) => state.verbs.media;
export const selectVerbsStatus = (state) => state.verbs.status;
export const { setVerbLanguage, setVerbMedia } = verbsSlice.actions;
export default verbsSlice.reducer;
