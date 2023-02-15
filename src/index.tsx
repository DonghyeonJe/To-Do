import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { RecoilRoot } from "recoil";

const queryClient = new QueryClient();

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript

root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
