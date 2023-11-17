import { configureStore } from '@reduxjs/toolkit'
import studentReducer from "./studentsSlice"
export const store = configureStore({
  reducer: {
   studen: studentReducer
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch