import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { persistor, store } from "data/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "views/styles/global";
import theme from "app/theme";
import Loading from "views/components/loading";
import { ToastProvider } from "react-toast-notifications";
import { Toaster } from "react-hot-toast";
import { ChakraBaseProvider } from "@chakra-ui/react";
import chakaraTheme from "app/theme/chakra-theme";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraBaseProvider theme={chakaraTheme}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <PersistGate loading={<Loading />} persistor={persistor}>
              <ToastProvider placement="bottom-center" autoDismiss>
                <GlobalStyles />
                <App />
                <Toaster />
              </ToastProvider>
            </PersistGate>
          </BrowserRouter>
        </ThemeProvider>
      </ChakraBaseProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
