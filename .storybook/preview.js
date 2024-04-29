import "../src/index.css";

import { BrowserRouter } from "react-router-dom";
import { store } from "app/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "presentation/styles/global";
import theme from "app/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

export const decorators = [
  (Story) => (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
];
