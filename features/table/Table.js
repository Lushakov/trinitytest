import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    loadDataAsync,
    toggleSelectId,
    selectLoading,
    selectError,
    selectSelectedId,
    selectSortBy,
    selectSearchText
} from './tableSlice';

import {sortSelector} from './libs/filter'

import styles from './Table.module.css'

const Table = () => {
    const dispatch = useDispatch();
    // const data = useSelector(selectData);
    const data = useSelector(sortSelector);
    const isLoading = useSelector(selectLoading);
    const error = useSelector(selectError);
    const selectedId = useSelector(selectSelectedId);
    const sortBy = useSelector(selectSortBy);
    const searchText = useSelector(selectSearchText);

    useEffect(() => {
        dispatch(loadDataAsync());
    }, []);

    const listRows = data.map(row =>
        <div 
         className={styles.row}
         active = {(selectedId == row.ID).toString()}
         key={row.ID}
         onClick={() => {dispatch(toggleSelectId(row.ID))}}
        >
            <div className={styles.baseInfo}>
                <div className={styles.cell}>{row.mark}</div>
                <div className={styles.cell}>{row.model}</div>
                <div className={styles.cell}>{row.type}</div>
                <div className={styles.cell}>{row.year}</div>
            </div>
            <div className={styles.addInfo}>
                <div><h4>Year:</h4><p>{row.year}</p></div>
                <div><h4>Color:</h4><p>{row.Color}</p></div>
                <div><h4>Country:</h4><p>{row.country}</p></div>
                <div><h4>Option:</h4><p>{row.option}</p></div>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            {isLoading ? 
            <div>Loading...</div>
            : error ?
            <div>{error}</div>
            :listRows} 
        </div>
    )
}
export default Table