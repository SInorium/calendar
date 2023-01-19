import Layout from "antd/lib/layout";
import React, { FC, useEffect } from "react";
import "./App.css";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useActions } from "./hooks/useActions";
import { IUser } from "./models/IUser";

const App: FC = () => {
  const { setUser, setIsAuth } = useActions();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setIsAuth(true);
      setUser({ username: localStorage.getItem("username" || "") } as IUser);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <NavBar />
      <Layout.Content>
        <AppRouter />
      </Layout.Content>
    </Layout>
  );
};

export default App;
