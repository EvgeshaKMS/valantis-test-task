import { Loader, PageWrapper } from 'components';

import styles from './LoaderPage.module.scss'

const LoaderPage = () => {
  return (
    <PageWrapper className={styles.wrapper}>
      <Loader />
    </PageWrapper>
  );
};

export default LoaderPage;
