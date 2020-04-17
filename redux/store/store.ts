import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import labelingReducer from '../slice/labelingSlice';

export const store = configureStore({
  reducer: {
    labeling: labelingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
