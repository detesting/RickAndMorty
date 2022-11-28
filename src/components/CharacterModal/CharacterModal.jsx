import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { useDispatch } from 'react-redux';

import { changeModal } from '../../store/charactersSlice';
import Character from '../Character';

import styles from './CharacterModal.module.css';

function CharacterModal({ character }) {
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);

  const showModal = () => {
    dispatch(changeModal());
    setOpenModal(true);
  };
  const handleOk = () => {
    dispatch(changeModal());
    setOpenModal(false);
  };
  const handleCancel = () => {
    dispatch(changeModal());
    setOpenModal(false);
  };

  return (
    <div>
      <Button className={styles.button} onClick={showModal} onCancel={handleCancel}>
        <Character character={character} />
      </Button>
      <Modal open={openModal} onOk={handleOk} onCancel={handleCancel}>
        <Character character={character} />
      </Modal>
    </div>
  );
}

export default CharacterModal;
