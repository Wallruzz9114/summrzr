import { configureStore } from '@reduxjs/toolkit';
import { articlesService } from './articlesService';

export const store = configureStore({
  reducer: { [articlesService.reducerPath]: articlesService.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesService.middleware),
});
