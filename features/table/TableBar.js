import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    loadDataAsync,
    loadDataStarted,
    loadDataSuccess,
    loadDataFailure,
    toggleSortByMark,
    toggleSortByType,
    toggleSortByYear,
    toggleGroupMark,
    toggleGroupType,
    changeSearchText,
    selectData,
    selectLoading,
    selectError,
    selectSearchText,
    selectSortBy,
    selectGroupBy,
    selectSelectedId,
} from './tableSlice';
import styles from './TableBar.module.css'

const TableBar = () => {
    const dispatch = useDispatch();
    const searchText = useSelector(selectSearchText)
    const groupBy = useSelector(selectGroupBy)
    const sortBy  = useSelector(selectSortBy)
    const selectedId = useSelector(selectSelectedId)

    return (
        <div className={styles.container}>
            <div className={styles.buttonBlock}>
                <h3>Group by:</h3>
                <div 
                 className={styles.button}
                 active={groupBy.mark.toString()}
                 inaccessible={(!selectedId).toString()}
                 onClick={selectedId ? () => {dispatch(toggleGroupMark())} :null}>Mark</div>
                <div
                 className={styles.button}
                 active={groupBy.type.toString()}
                 inaccessible={(!selectedId).toString()}
                 onClick={selectedId ? () => {dispatch(toggleGroupType())} :null}>Type</div>
            </div>
            <div className={styles.buttonBlock}>
                <h3>Sort by:</h3>
                <div
                 className={styles.button}
                 active={(sortBy == 'mark').toString()}
                 onClick={() => {dispatch(toggleSortByMark())}}>Mark</div>
                <div
                 className={styles.button}
                 active={(sortBy == 'type').toString()}
                 onClick={() => {dispatch(toggleSortByType())}}>Type</div>
                <div
                 className={styles.button}
                 active={(sortBy == 'year').toString()}
                 onClick={() => {dispatch(toggleSortByYear())}}>Year</div>
            </div>
            <input
             className={styles.searchInput}
             placeholder="Search..."
             type="text"
             value={searchText}
             onChange={e => {dispatch(changeSearchText(e.target.value))}}
            />
        </div>
    )
}
export default TableBar