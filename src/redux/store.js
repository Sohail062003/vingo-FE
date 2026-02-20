// import { configureStore } from "@reduxjs/toolkit";
// import userSlice from "./userSlice"
// import ownerSlice from "./ownerSlice"
// import mapSlice from "./mapSlice"

// export const store=configureStore({
//     reducer: {
//         user: userSlice,
//         owner: ownerSlice,
//         map: mapSlice
//     }
// })


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import { combineReducers } from "redux";
import userSlice from "./userSlice";
import ownerSlice from "./ownerSlice";
import mapSlice from "./mapSlice";

const rootReducer = combineReducers({
  user: userSlice,
  owner: ownerSlice,
  map: mapSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // only persist user slice (auth data lives here)
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

export const persistor = persistStore(store);