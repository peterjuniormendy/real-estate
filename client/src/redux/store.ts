import {
  combineReducers,
  configureStore,
  createAction,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slice/userSlice";
import listingSlice from "./slice/listingSlice";

export const purgeStore = createAction("PURGE");

const rootReducer = combineReducers({
  user: userSlice,
  listings: listingSlice,
});

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const purgeStoredState = () => (dispatch: AppDispatch) => {
  dispatch({ type: PURGE, payload: null, result: () => null });
};

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
