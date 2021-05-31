import { configureStore } from '@reduxjs/toolkit';
import tableReducer from './table/tableSlice';

export default configureStore({
  reducer: {
    table: tableReducer,
  },
});