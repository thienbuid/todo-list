import React, { useState } from "react";
import styles from "@/styles/home.module.scss";
import TodoItem from "@/components/TagNote/todo-item";
import ToDo, { STATUS_TODO } from "@/interfaces/todo.interface";
import Button from "@/components/Button/button";
import { BiAddToQueue, BiSolidTrash, BiTrash } from "react-icons/bi";
import { useTodo } from "@/store/useTodo";
import { v4 as uuidv4 } from "uuid";
import { Metadata } from "next";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const notifyNoContent = () =>
    toast.error("Please enter note content", {
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const { todos, addTodo, removeTodosByStatus } = useTodo();

  const handleAddTodo = () => {
    if (newTodo !== "") {
      const todo = {
        content: newTodo,
        createDate: Date.now().toString(),
        id: uuidv4(),
        status: STATUS_TODO.TODO,
      };
      addTodo(todo);
      setNewTodo("");
    } else {
      notifyNoContent();
    }
  };

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>TODO LIST - SKY MAVIS</span>
          <span className={styles.sub_title}>Todo list application</span>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTodo();
          }}
          className={styles.add_todo_container}
        >
          <div className={styles.box_add_todo}>
            <input
              value={newTodo}
              onChange={(e) => {
                setNewTodo(e.target.value);
              }}
            />
          </div>
          <Button>
            <BiAddToQueue fontSize={32} />{" "}
            <span style={{ display: "inline-block", width: "100%" }}>ADD</span>
          </Button>
        </form>
        <div className={styles.body}>
          <div>
            <div className={styles.box}>
              <div className={styles.box_header}>
                <span>TO-DO</span>
              </div>
              <div className={styles.list_todo}>
                {todos
                  .filter((todo) => todo.status === STATUS_TODO.TODO)
                  .map((todo) => {
                    return <TodoItem key={todo.id} todo={todo} />;
                  })}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.box}>
              <div className={styles.box_header}>
                <span>IN PROGRESS</span>
              </div>
              <div className={styles.list_todo}>
                {todos
                  .filter((todo) => todo.status === STATUS_TODO.INPROGRESS)
                  .map((todo) => {
                    return <TodoItem key={todo.id} todo={todo} />;
                  })}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.box}>
              <div className={styles.box_header}>
                <span>COMPLETED</span>
                <Button
                  onClick={() => {
                    removeTodosByStatus(STATUS_TODO.COMPLETED);
                  }}
                >
                  <BiTrash fontSize={28} />{" "}
                  <span style={{ display: "inline-block", width: "100%" }}>
                    CLEAR
                  </span>
                </Button>
              </div>
              <div className={styles.list_todo}>
                {todos
                  .filter((todo) => todo.status === STATUS_TODO.COMPLETED)
                  .map((todo) => {
                    return <TodoItem key={todo.id} todo={todo} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
