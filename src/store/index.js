import { configureStore } from '@reduxjs/toolkit';

import charactersSlice from './charactersSlice';

export default configureStore({
  reducer: {
    characters: charactersSlice,
  },
});
