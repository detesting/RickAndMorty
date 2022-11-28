import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../Header';
import Filters from '../Filters';
import ListCharacters from '../ListCharacters';

import styles from './App.module.css';

function App() {
  const modal = useSelector((state) => state.characters.modal);

  return (
    <div className={styles.App} style={modal ? { opacity: '60%' } : { opacity: '100%' }}>
      <Header />
      <Filters />
      <ListCharacters />
    </div>
  );
}

export default App;
