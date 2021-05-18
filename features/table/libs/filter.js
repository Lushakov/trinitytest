import { createSelector } from 'reselect';


const getData = (state) => state.table.data;
const getMarkGroup = (state) => {
    if (!state.table.groupBy.mark) return null;
    const item = state.table.data.find((item) => item.ID === state.table.selectedId)
    return item ? item.mark : null 
}
const getTypeGroup = (state) => {
    if (!state.table.groupBy.type) return null;
    const item = state.table.data.find((item) => item.ID === state.table.selectedId)
    return item ? item.type : null 
}
const getSortBy = (state) => state.table.sortBy;
const getSearchText = (state) => state.table.searchText;



export const markGroupSelector = createSelector(
  [getData, getMarkGroup],
  (data, mark) => {
    if (!mark) return data.slice(); 
    return data.filter((item) => item.mark === mark)
  },
);


export const typeGroupSelector = createSelector(
    [markGroupSelector, getTypeGroup],
    (data, type) => {
        if (!type) return data.slice(); 
        return data.filter((item) => item.type === type)
    },
  );





export const searchSelector = createSelector(
    [typeGroupSelector, getSearchText],
    (data, searchText) => {
      return data.filter((item) => {
        for (const prop in item) {
            if(item[prop].toLocaleLowerCase().includes(searchText.toLocaleLowerCase())) return true
        }
        return false
      });
    },
  );

  export const sortSelector = createSelector(
    [searchSelector, getSortBy],
    (data, sortBy) => {
      return data.sort((a, b) => a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0 );
    },
  );


  