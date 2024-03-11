import React from 'react';

import { ItemProps } from './types';
import styles from './Item.module.scss';

const Item = ({ item }: ItemProps) => {
  return (
    <li className={styles.item}>
      <span>{item.id}</span>
      <h3 className={styles.name}>{item.product}</h3>
      {item.brand && <span className={styles.brand}>{item.brand}</span>}
      <span className={styles.price}>{item.price} ₽</span>
    </li>
  );
};

export default Item;
