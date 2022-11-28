import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCharacters = createAsyncThunk(
  'characters/getCharacters',
  async function getCharactersAll({ page, url, filter }) {
    if (filter) {
      let { name, status, species, type, gender } = filter;
      try {
        let { data } = await axios.get(
          `${url}/character/?name=${name}&status=${status}&species=${species}&type=${type}&gender=${gender}&page=${page}`
        );
        return data;
      } catch (e) {
        return 'error';
      }
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    url: 'https://rickandmortyapi.com/api/',
    characterArr: [],
    loading: false,
    error: false,
    charactersCount: 0,
    page: 1,
    filter: {
      name: '',
      status: '',
      species: '',
      type: '',
      gender: '',
    },
    modal: false,
  },
  reducers: {
    changePage(state, action) {
      state.page = action.payload.page;
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
    changeModal(state) {
      state.modal = !state.modal;
    },
  },
  extraReducers: {
    [getCharacters.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getCharacters.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      if (action.payload === 'error') {
        state.error = true;
        state.characterArr = [];
        state.charactersCount = 1;
        state.page = 1;
      } else {
        state.characterArr = action.payload.results;
        state.charactersCount = action.payload.info.count;
      }
    },
    [getCharacters.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { changePage, changeFilter, changeModal } = charactersSlice.actions;

export default charactersSlice.reducer;
