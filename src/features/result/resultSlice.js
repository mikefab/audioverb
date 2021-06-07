import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchResult
} from './resultAPI';

const initialState = {
  result: [],
  status: 'idle',
};



// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getResult = createAsyncThunk(
  'result/fetchResult',
  async (query) => {
    const [name, num] = query.split('^')
    const response = await fetchResult(name, num);
    // The value we return becomes the `fulfilled` action payload
    return response.data || {};
  }
);

export const resultSlice = createSlice({
  name: 'result',
  initialState,
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getResult.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getResult.fulfilled, (state, action) => {
        state.status = 'idle';
        state.result = action.payload;
      })
  },

});

export const selectResult = (state) => state.result.result;
export default resultSlice.reducer;
