import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchIds, fetchItems } from './ActionCreator';
import { IItem, IResult } from 'types/IItemSlice';

const initialState = {
  ids: [] as string[],
  items: [] as IItem[],
  isLoading: false,
};

export const idsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIds.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIds.fulfilled, (state, action: PayloadAction<IResult<string[]>>) => {
      state.isLoading = false;
      state.ids = action.payload.result;
    });
    builder.addCase(fetchIds.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
    builder.addCase(fetchItems.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchItems.fulfilled, (state, action: PayloadAction<IResult<IItem[]>>) => {
      state.isLoading = false;
      state.items = action.payload.result.filter((item, index, self) => {
        return self.findIndex((selfItem) => selfItem.id === item.id) === index;
      });
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
  },
});

export default idsSlice.reducer;
