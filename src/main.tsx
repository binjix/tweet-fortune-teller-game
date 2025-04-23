
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { PrivyProvider } from "@privy-io/react-auth";
import { PRIVY_APP_ID } from "./privy.env";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ["twitter"],
        appearance: {
          theme: "light",
          accentColor: "#007AFF",
        },
      }}
    >
      <App />
    </PrivyProvider>
  </React.StrictMode>
);
