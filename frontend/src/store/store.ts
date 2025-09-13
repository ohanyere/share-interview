// import { configureStore, combineReducers} from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import { persistReducer} from "redux-persist";
// import { persistStore } from 'redux-persist';
// import { authSlice } from "../features/auth/authSlice";


// const persistConfig = {
//     key : "root",
//     version : 1,
//     storage,
//     whiteList : ["auth"]
// }

// const CombineReducers = combineReducers({
//     auth : authSlice
// })

// const persistedReducer = persistReducer(persistConfig, CombineReducers)
// export const store = configureStore({
//     reducer : persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// })
// export let persistor = persistStore(store)
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch


import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});


export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
