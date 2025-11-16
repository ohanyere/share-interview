// src/utilis/test.utils.js
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import authReducer from "../features/auth/authSlice"
import { BrowserRouter } from "react-router-dom";

export function renderWithProvider(
  ui,
  {
    preloadedState = {},
    store = configureStore({
      reducer: { auth: authReducer },   // include your real reducers here
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
