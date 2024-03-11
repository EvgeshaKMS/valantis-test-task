import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './PageWrapper.module.scss';

const PageWrapper = ({
  children,
  className = '',
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
  const mainStyles: string = clsx(className, styles.container);

  return (
    <main className={styles.main}>
      <div className={mainStyles} {...props}>
        {children}
      </div>
    </main>
  );
};

export default PageWrapper;
