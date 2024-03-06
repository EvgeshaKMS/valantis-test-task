import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchIds, fetchItems } from 'store/redusers/ActionCreator';

import { PageWrapper } from 'components';
import LoaderPage from 'pages/LoaderPage/LoaderPage';

import styles from './List.module.scss';

const List = () => {
  const dispatch = useAppDispatch();
  const { isLoading, items, isError } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchIds()).then(() => {
      dispatch(fetchItems());
    });
  }, []);

  useEffect(() => {
    if (isError && !isLoading) {
      dispatch(fetchIds()).then(() => {
        dispatch(fetchItems());
      });
    }
  }, [isError]);

  if (isLoading) {
    return <LoaderPage />;
  }

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
};

export default List;
