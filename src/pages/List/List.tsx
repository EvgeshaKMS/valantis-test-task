import React, { useEffect } from 'react';
import { Button, Flex } from 'antd';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchIds, fetchItems } from 'store/redusers/ActionCreator';
import { itemsSlice } from 'store/redusers/ItemsSlice';

import { Loader, PageWrapper } from 'components';
import LoaderPage from 'pages/LoaderPage/LoaderPage';

import styles from './List.module.scss';

const List = () => {
  const dispatch = useAppDispatch();
  const { isLoading, items, isError, page } = useAppSelector((state) => state.items);
  const { onPageChange, pageIncrement, pageDecrement } = itemsSlice.actions;

  useEffect(() => {
    dispatch(fetchIds()).then(() => {
      dispatch(fetchItems());
    });
  }, [page]);

  useEffect(() => {
    if (isError && !isLoading) {
      dispatch(fetchIds()).then(() => {
        dispatch(fetchItems());
      });
    }
  }, [isError]);

  return (
    <PageWrapper>
      <h1>Ювелирные украшения</h1>

      {isLoading && <Loader />}

      {items.length > 0 && !isLoading && (
        <Flex gap={20} vertical={true}>
          {items.map((item) => (
            <Flex key={item.id} gap={8} vertical={true}>
              <span>{item.id}</span>
              <span>{item.product}</span>
              {item.brand && <span>{item.brand}</span>}
              <span>{item.price}</span>
            </Flex>
          ))}
        </Flex>
      )}

      <Flex gap={10} style={{ marginTop: 'auto' }}>
        <Button
          onClick={() => {
            dispatch(onPageChange(page - 1));
          }}
          disabled={page === 1 || isLoading}
          size='middle'
          loading={isLoading}
        >
          Prev.
        </Button>
        <Button
          onClick={() => {
            dispatch(onPageChange(page + 1));
          }}
          disabled={isLoading}
          size='middle'
          loading={isLoading}
        >
          Next.
        </Button>
      </Flex>
    </PageWrapper>
  );
};

export default List;
