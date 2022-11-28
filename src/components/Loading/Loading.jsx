import React from 'react';
import { Spin } from 'antd';

import styles from './Loading.module.css';

export default function Loading() {
  return <Spin size="large" className={styles.spinner} />;
}
