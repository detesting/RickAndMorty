import React, { useEffect } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getCharacters, changeFilter } from '../../store/charactersSlice';

import styles from './Filters.module.css';

function Filters() {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const url = useSelector((state) => state.characters.url);
  const currentPage = useSelector((state) => state.characters.page);
  const filter = useSelector((state) => state.characters.filter);

  const onFilter = async function ({ name = '', status = '', species = '', type = '', gender = '' }) {
    if (status === 'none') {
      status = '';
    }
    if (gender === 'none') {
      gender = '';
    }
    await dispatch(changeFilter({ name, status, species, type, gender }));
  };

  useEffect(() => {
    async function Effect() {
      await dispatch(getCharacters({ currentPage, url, filter }));
    }
    Effect();
  }, [filter]);

  return (
    <div className={styles.filters}>
      <div className={styles.title}>Filters</div>
      <Form
        form={form}
        name="filters_form"
        onFinish={onFilter}
        layout="inline"
        className={styles.form}
        initialValues={filter}
      >
        <Form.Item label="Name" name="name" className={styles.item}>
          <Input className={styles.input} placeholder="Name" value={filter.name} />
        </Form.Item>
        <Form.Item label="Status" name="status" className={styles.item}>
          <Select
            value={filter.status}
            style={{ width: 120 }}
            className={styles.select}
            options={[
              {
                value: 'none',
                label: 'None',
              },
              {
                value: 'alive',
                label: 'Alive',
              },
              {
                value: 'dead',
                label: 'Dead',
              },
              {
                value: 'unknown',
                label: 'Unknown',
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Species" name="species" className={styles.item}>
          <Input className={styles.input} placeholder="Species" value={filter.species} />
        </Form.Item>
        <Form.Item label="Type" name="type" className={styles.item}>
          <Input className={styles.input} placeholder="Type" value={filter.type} />
        </Form.Item>
        <Form.Item label="Gender" name="gender" className={styles.item}>
          <Select
            value={filter.gender}
            style={{ width: 120 }}
            className={styles.select}
            options={[
              {
                value: 'none',
                label: 'None',
              },
              {
                value: 'female',
                label: 'Female',
              },
              {
                value: 'male',
                label: 'Male',
              },
              {
                value: 'genderless',
                label: 'Genderless',
              },
              {
                value: 'unknown',
                label: 'Unknown',
              },
            ]}
          />
        </Form.Item>
        <Form.Item className={styles.item} name="submit">
          <Button htmlType="submit" className={styles.button}>
            Filter
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Filters;
