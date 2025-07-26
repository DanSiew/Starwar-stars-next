import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import starwarReducer from './features/starwarSlice';
import peopleReducer from './features/peopleSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    starwar: starwarReducer,
    people: peopleReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;