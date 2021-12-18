import { configureStore } from '@reduxjs/toolkit';

import { weatherApi } from '../src/Services/weatherApi';

export default configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
});
