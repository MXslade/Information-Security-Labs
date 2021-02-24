import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import Main from "./components/Main";

const App: React.FC = () => {
  return (
    <>
      <Layout.Header
        style={{
          color: "white",
          textAlign: "center",
          fontSize: "2.5rem",
          fontFamily: "Oswald",
        }}
      >
        Muldashev Turar CSSE 1801K
      </Layout.Header>
      <Layout>
        <Layout.Content
          style={{
            width: "80%",
            minWidth: "300px",
            justifySelf: "center",
            alignSelf: "center",
          }}
        >
          <Main />
        </Layout.Content>
      </Layout>
    </>
  );
};

export default App;
