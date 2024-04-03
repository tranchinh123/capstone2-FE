import { useEffect } from 'react';
import styles from './styles.module.scss';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const LoadingLazyComponent = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return <div className={styles.loading}></div>;
};

export { LoadingLazyComponent };
