import { createAsyncThunk } from '@reduxjs/toolkit';

import { IItem, IItemsState, IResult } from 'types/IItemSlice';
import makeRequest from '../makeRequest';

export const fetchIds = createAsyncThunk<IResult<string[]>, number, { rejectValue: string }>(
  'items/fetchIds',
  async function (offset, { rejectWithValue }) {
    try {
      const response = await makeRequest<IResult<string[]>>({
        data: { action: 'get_ids', params: { offset, limit: 50 } },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.status);
    }
  },
);

export const fetchItems = createAsyncThunk<
  IResult<IItem[]>,
  undefined,
  { rejectValue: string; state: { items: IItemsState } }
>('items/fetchItems', async function (_, { getState, rejectWithValue, dispatch }) {
  const ids = getState().items.ids;

  if (ids.length) {
    try {
      const response = await makeRequest<IResult<IItem[]>>({
        data: {
          action: 'get_items',
          params: { ids },
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message());
    }
  }
  return rejectWithValue('No ids found');
});
