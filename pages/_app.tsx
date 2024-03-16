import React, { useEffect } from "react";
import "@/styles/globals.scss";
import { AppProps } from "next/app";
import { useTodo } from "@/store/useTodo";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Props extends AppProps {}

const MyApp = (props: Props) => {
  const todos = useTodo();

  useEffect(() => {
    todos.initializeTodos();
  }, []);

  const { Component } = props;
  return (
    <>
      <ToastContainer />
      <Component {...props} />
    </>
  );
};

export default MyApp;
