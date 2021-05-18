import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const tableSlice = createSlice({
  name: 'table',
  initialState: {
    loading: false,
    error: null,
    searchText: '',
    sortBy: null,
    groupBy: {
        mark: false,
        type: false
    },
    selectedId: null,
    data: [],
  },
  reducers: {
    loadDataStarted: state => {state.loading = true},
    loadDataSuccess: (state, action) => {
        state.loading = false;
        state.error = null;
        state.data = action.payload
    },
    loadDataFailure: (state, action) => {
        state.loading = false;
        state.error = action.payload
    },
    toggleSortByMark: state => {state.sortBy = state.sortBy == 'mark' ? null : 'mark'},
    toggleSortByType: state => {state.sortBy = state.sortBy == 'type' ? null : 'type'},
    toggleSortByYear: state => {state.sortBy = state.sortBy == 'year' ? null : 'year'},
    toggleGroupMark: state => {state.groupBy.mark = !state.groupBy.mark},
    toggleGroupType: state => {state.groupBy.type = !state.groupBy.type},
    changeSearchText: (state, action) => {state.searchText = action.payload},
    toggleSelectId: (state, action) => {
        state.selectedId = 
        state.selectedId == action.payload ? null : action.payload
    }
  },
});

export const { 
    loadDataStarted,
    loadDataSuccess,
    loadDataFailure,
    toggleSortByMark,
    toggleSortByType,
    toggleSortByYear,
    toggleGroupMark,
    toggleGroupType,
    changeSearchText,
    toggleSelectId,
} = tableSlice.actions;

export const loadDataAsync = () => dispatch => {
    dispatch(loadDataStarted());
    axios
      .post('http://localhost:3000/api/data')
      .then(res => {
        dispatch(loadDataSuccess(res.data));
      })
      .catch(err => {
        dispatch(loadDataFailure(err.message));
      });
};

export const selectData = state => state.table.data
export const selectLoading = state => state.table.loading
export const selectError = state => state.table.error
export const selectSearchText = state => state.table.searchText
export const selectSortBy = state => state.table.sortBy
export const selectGroupBy = state => state.table.groupBy
export const selectSelectedId = state => state.table.selectedId



export default  tableSlice.reducer;