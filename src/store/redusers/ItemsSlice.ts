import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchFilterIds, fetchIds, fetchItems } from './ActionCreator';
import { IItem, IItemsState, IResult } from 'types/IItemSlice';

const initialState: IItemsState = {
  ids: [] as string[],
  items: [] as IItem[],
  isLoading: false,
  page: 1,
  filterPage: 1,
  isError: false,
  isFilter: false,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    onPageChange(state, action) {
      state.page = action.payload;
    },
    onFilterPageChange(state, action) {
      state.filterPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchIds.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
      state.page = 1;
    });
    builder.addCase(fetchIds.fulfilled, (state, action: PayloadAction<IResult<string[]>>) => {
      state.isLoading = false;
      state.isError = false;
      state.isFilter = false;
      state.ids = action.payload.result;
    });
    builder.addCase(fetchIds.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action.payload);
    });

    builder.addCase(fetchItems.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchItems.fulfilled, (state, action: PayloadAction<IResult<IItem[]>>) => {
      state.isLoading = false;
      state.isError = false;
      state.items = action.payload.result.filter((item, index, self) => {
        return self.findIndex((selfItem) => selfItem.id === item.id) === index;
      });
    });
    builder.addCase(fetchItems.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action.payload);
    });

    builder.addCase(fetchFilterIds.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchFilterIds.fulfilled, (state, action: PayloadAction<IResult<string[]>>) => {
      state.isLoading = false;
      state.isError = false;
      state.isFilter = true;
      state.filterPage = 1;
      state.ids = action.payload.result;
    });
    builder.addCase(fetchFilterIds.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log(action.payload);
    });
  },
});

export default itemsSlice.reducer;
