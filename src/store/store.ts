import { configureStore, combineReducers } from '@reduxjs/toolkit';
import idsReducer from './redusers/ItemsSlice';

// const rootReducer = combineReducers({
//   idsReducer,
// });
//
// export const setupStore = () => {
//   return configureStore({
//     reducer: rootReducer,
//   });
// };
const store = configureStore({
  reducer: {
    items: idsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type RootState = ReturnType<typeof rootReducer>;
// export type AppStore = ReturnType<typeof setupStore>;
// export type AppDispatch = AppStore['dispatch'];
