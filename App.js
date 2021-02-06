import React from "react";
import { Provider, DefaultTheme } from "react-native-paper";
import { Router } from "./src/routing";
import { RecoilRoot } from "recoil";
import AppContent from "./src/components/AppContent";

const theme = {
  ...DefaultTheme,
  roundness: 0,
  colors: {
    ...DefaultTheme.colors,
    primary: "#56B8BC",
    secondary: "#FBCD52",
  },
};

export default function App() {
  return (
    <RecoilRoot>
      <Provider theme={theme}>
        <Router>
          <AppContent />
        </Router>
      </Provider>
    </RecoilRoot>
  );
}
