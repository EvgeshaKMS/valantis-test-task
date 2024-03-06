import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './PageWrapper.module.scss';

const PageWrapper = ({
  children,
  className = '',
}: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => {
  const mainStyles: string = clsx(className, styles.container);

  return (
    <main className={styles.main}>
      <div className={mainStyles}>{children}</div>
    </main>
  );
};

export default PageWrapper;
