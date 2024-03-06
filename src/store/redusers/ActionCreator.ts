import { createAsyncThunk } from '@reduxjs/toolkit';

import { IItem, IItemsState, IResult } from 'types/IItemSlice';
import makeRequest from '../makeRequest';

export const fetchIds = createAsyncThunk<
  IResult<string[]>,
  undefined,
  { rejectValue: string; state: { items: IItemsState } }
>('items/fetchIds', async function (_, { rejectWithValue, getState }) {
  try {
    const offset = (getState().items.page - 1) * 50;
    const response = await makeRequest<IResult<string[]>>({
      data: { action: 'get_ids', params: { offset, limit: 50 } },
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.status);
  }
});

export const fetchItems = createAsyncThunk<
  IResult<IItem[]>,
  undefined,
  { rejectValue: string; state: { items: IItemsState } }
>('items/fetchItems', async function (_, { getState, rejectWithValue }) {
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
      return rejectWithValue(error.response.status);
    }
  }
  return rejectWithValue('No ids found');
});
