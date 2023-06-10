import { configureStore, combineReducers } from "@reduxjs/toolkit";
import employeeReducer from "./EmployeeRedux.js";
import hospitalReducer from "./hospitalRedux";
import customerReducer from "./CustomerRedux";
import employeesReducer from "./EmployeesRedux.js";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: employeeReducer,
  customers: customerReducer,
  hospital: hospitalReducer,
  employees: employeesReducer
});

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

export let persistor = persistStore(store);
