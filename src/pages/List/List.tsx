import React, { useEffect } from 'react';
import { Button, Flex, Input, InputNumber, Pagination, Typography, Form, Space } from 'antd';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchFilterIds, fetchIds, fetchItems } from 'store/redusers/ActionCreator';
import { itemsSlice } from 'store/redusers/ItemsSlice';

import { Loader, PageWrapper } from 'components';

import styles from './List.module.scss';
import { useSearchParams } from 'react-router-dom';

const List = () => {
  const dispatch = useAppDispatch();
  const { isLoading, items, isError, page, filterPage, isFilter } = useAppSelector(
    (state) => state.items,
  );
  const { onPageChange, onFilterPageChange } = itemsSlice.actions;

  const [form] = Form.useForm();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    dispatch(fetchIds()).then(() => {
      dispatch(fetchItems());
    });
  }, [page]);

  const onFinish = (e: any) => {
    const filter = Object.keys(e).find((key) => {
      if (e[key]) return key;
    });

    if (filter) {
      const params = { [filter]: e[filter] };

      dispatch(fetchFilterIds(params)).then(() => {
        dispatch(fetchItems());
      });
    }
  };

  const onReset = () => {
    form.resetFields();
    if (isFilter) {
      dispatch(fetchIds()).then(() => {
        dispatch(fetchItems());
      });
    }
  };

  if (isError) {
    return <Typography.Title>Что-то пошло не так, перезагрузите страницу</Typography.Title>;
  }

  return (
    <PageWrapper>
      <h1>Ювелирные украшения</h1>

      <Form form={form} layout='vertical' onFinish={onFinish} disabled={isLoading}>
        <Form.Item name='product' label='Название'>
          <Input
            onChange={() => {
              form.setFieldValue('brand', '');
              form.setFieldValue('price', '');
            }}
          />
        </Form.Item>
        <Form.Item name='brand' label='Бренд'>
          <Input
            onChange={() => {
              form.setFieldValue('product', '');
              form.setFieldValue('price', '');
            }}
          />
        </Form.Item>
        <Form.Item name='price' label='Цена'>
          <InputNumber
            onChange={() => {
              form.setFieldValue('product', '');
              form.setFieldValue('brand', '');
            }}
            type='number'
            controls={false}
          />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' htmlType='submit'>
              Принять
            </Button>
            <Button htmlType='button' onClick={onReset}>
              Reset
            </Button>
          </Space>
        </Form.Item>
      </Form>

      {isLoading && <Loader />}

      {items.length > 0 && !isLoading && !isFilter && (
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

      {items.length > 0 && !isLoading && isFilter && (
        <Flex gap={20} vertical={true}>
          {items.map((item, index) => {
            if (index >= (filterPage - 1) * 50 && index < filterPage * 50)
              return (
                <Flex key={item.id} gap={8} vertical={true}>
                  <span>{item.id}</span>
                  <span>{item.product}</span>
                  {item.brand && <span>{item.brand}</span>}
                  <span>{item.price}</span>
                </Flex>
              );
          })}
        </Flex>
      )}

      {isFilter ? (
        <Pagination
          pageSize={50}
          total={items.length}
          style={{ marginTop: 'auto' }}
          onChange={(page) => {
            dispatch(onFilterPageChange(page));
          }}
          showSizeChanger={false}
        />
      ) : (
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
      )}
    </PageWrapper>
  );
};

export default List;
