import React, { useEffect } from 'react';
import { Button, Flex, Input, InputNumber, Pagination, Typography, Form, Space } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { fetchFilterIds, fetchIds, fetchItems } from 'store/redusers/ActionCreator';
import { itemsSlice } from 'store/redusers/ItemsSlice';

import { Loader, PageWrapper } from 'components';

import styles from './List.module.scss';
import Item from './Item/Item';

const List = () => {
  const dispatch = useAppDispatch();
  const { isLoading, items, isError, page, filterPage, isFilter } = useAppSelector(
    (state) => state.items,
  );
  const { onPageChange, onFilterPageChange } = itemsSlice.actions;

  const [form] = Form.useForm();

  const fetch = () => {
    dispatch(fetchIds()).then(() => {
      dispatch(fetchItems());
    });
  };

  useEffect(() => {
    fetch();
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
      fetch();
    }
  };

  const onValuesChange = () => {
    if (
      !form.getFieldValue('product') &&
      !form.getFieldValue('brand') &&
      !form.getFieldValue('price') &&
      isFilter
    ) {
      fetch();
    }
  };

  if (isError) {
    return (
      <div className={styles.error}>
        <Typography.Title>Что-то пошло не так, перезагрузите страницу</Typography.Title>
        <Button icon={<ReloadOutlined />} size='large' type='primary' onClick={() => fetch()} />
      </div>
    );
  }
  return (
    <PageWrapper>
      <h1>Ювелирные украшения</h1>

      <Form
        form={form}
        onValuesChange={onValuesChange}
        layout='vertical'
        onFinish={onFinish}
        disabled={isLoading}
        className={styles.form}
      >
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
        <ul className={styles.list}>
          {items.map((item) => (
            <Item item={item} key={item.id} />
          ))}
        </ul>
      )}

      {items.length > 0 && !isLoading && isFilter && (
        <ul className={styles.list}>
          {items.map((item, index) => {
            if (index >= (filterPage - 1) * 50 && index < filterPage * 50)
              return <Item item={item} key={item.id} />;
          })}
        </ul>
      )}

      {isFilter ? (
        <Pagination
          pageSize={50}
          total={items.length}
          className={styles.pagination}
          onChange={(page) => {
            dispatch(onFilterPageChange(page));
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
          }}
          showSizeChanger={false}
        />
      ) : (
        <Flex gap={10} className={styles.pagination}>
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
