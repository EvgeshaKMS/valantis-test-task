import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchIds, fetchItems } from 'store/redusers/ActionCreator';
import styles from './List.module.scss';

const List = () => {
  const dispatch = useAppDispatch();
  const { isLoading, items } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchIds(1)).then(() => {
      dispatch(fetchItems());
    });
  }, []);

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <h1>Идет загрузка...</h1>
      </div>
    );
  }
// todo: добавить директорию pages, настроить роутинг
  return (
    <div className={styles.wrapper}>
      <h1>Ювелирные украшения</h1>

      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.id}</span>
            <span>{item.product}</span>
            {item.brand && <span>{item.brand}</span>}
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
