import React, { useEffect } from 'react';
import { List, Pagination, Card } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { getCharacters, changePage } from '../../store/charactersSlice';
import Loading from '../Loading';
import CharacterModal from '../CharacterModal';

import styles from './ListCharacters.module.css';

function ListCharacters() {
  const dispatch = useDispatch();

  const page = useSelector((state) => state.characters.page);
  const url = useSelector((state) => state.characters.url);
  const filter = useSelector((state) => state.characters.filter);

  const currentPage = useSelector((state) => state.characters.page);
  const charactersCount = useSelector((state) => state.characters.charactersCount);
  const characters = useSelector((state) => state.characters.characterArr);

  const loading = useSelector((state) => state.characters.loading);
  const error = useSelector((state) => state.characters.error);

  useEffect(() => {
    async function Effect() {
      await dispatch(getCharacters({ page, url, filter }));
    }
    Effect();
  }, [currentPage]);

  return (
    <div className={styles.ListCharacters}>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className={styles.error}>No results</div>
      ) : (
        <div className={styles.characters_list}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 1,
              md: 1,
              lg: 2,
              xl: 2,
              xxl: 2,
            }}
            dataSource={characters}
            renderItem={(character) => (
              <List.Item>
                <Card className={styles.item}>
                  <CharacterModal character={character} />
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            defaultCurrent={1}
            total={charactersCount}
            pageSize={20}
            showSizeChanger={false}
            className={styles.pagination}
            current={currentPage}
            onChange={(page) => dispatch(changePage({ page }))}
          />
        </div>
      )}
    </div>
  );
}

export default ListCharacters;
