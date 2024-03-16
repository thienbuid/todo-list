import React, { useState, useRef, useEffect } from "react";
import styles from "./todo-item.module.scss";
import ToDo, { STATUS_TODO } from "@/interfaces/todo.interface";
import { HiDotsVertical } from "react-icons/hi";
import {
  BiCaretRight,
  BiChevronDownCircle,
  BiSolidTrash,
  BiLoader,
  BiSolidCheckCircle,
  BiCheckCircle,
  BiEdit,
  BiAddToQueue,
  BiSave,
  BiRedo,
} from "react-icons/bi";
import { useTodo } from "@/store/useTodo";
import Button from "../Button/button";
import { toast } from "react-toastify";

export interface Props {
  todo: ToDo;
}

const Options = ({ todo }: Props) => {
  const { removeTodo, updateTodo } = useTodo();
  switch (todo.status) {
    case STATUS_TODO.TODO: {
      return (
        <div className={styles.option}>
          <div
            className={styles.option_item}
            onClick={() => {
              updateTodo({ ...todo, status: STATUS_TODO.INPROGRESS });
            }}
          >
            <BiLoader fontSize={20} /> <span>In progress</span>
          </div>
          <div
            className={styles.option_item}
            onClick={() => {
              removeTodo(todo);
            }}
          >
            <BiSolidTrash fontSize={20} /> <span>Remove</span>
          </div>
        </div>
      );
    }
    case STATUS_TODO.INPROGRESS: {
      return (
        <div className={styles.option}>
          <div
            className={styles.option_item}
            onClick={() => {
              updateTodo({ ...todo, status: STATUS_TODO.COMPLETED });
            }}
          >
            <BiCheckCircle fontSize={20} /> <span>Compeleted</span>
          </div>
          <div
            className={styles.option_item}
            onClick={() => {
              updateTodo({ ...todo, status: STATUS_TODO.TODO });
            }}
          >
            <BiCaretRight fontSize={20} /> <span>Todo</span>
          </div>
          <div
            className={styles.option_item}
            onClick={() => {
              removeTodo(todo);
            }}
          >
            <BiSolidTrash fontSize={20} /> <span>Remove</span>
          </div>
        </div>
      );
    }
    case STATUS_TODO.COMPLETED: {
      return (
        <div className={styles.option}>
          <div
            className={styles.option_item}
            onClick={() => {
              updateTodo({ ...todo, status: STATUS_TODO.TODO });
            }}
          >
            <BiCaretRight fontSize={20} /> <span>Todo</span>
          </div>
          <div
            className={styles.option_item}
            onClick={() => {
              removeTodo(todo);
            }}
          >
            <BiSolidTrash fontSize={20} /> <span>Remove</span>
          </div>
        </div>
      );
    }
  }
};

const ButtonOptions = ({ todo }: Props) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={styles.option_container}>
      <div
        className={styles.button_options}
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <HiDotsVertical />
      </div>
      {showOptions && <Options todo={todo} />}
    </div>
  );
};

const TodoItem = ({ todo }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [textEdit, setTextEdit] = useState(todo.content);
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
  const uTodo = useTodo();

  const handleUpdateNote = () => {
    if (textEdit) {
      uTodo.updateTodo({ ...todo, content: textEdit });
      setIsEdit(false);
    } else {
      notifyNoContent();
    }
  };

  return (
    <div
      className={`${styles.tag} ${
        todo.status === STATUS_TODO.TODO && styles.todo
      } ${todo.status === STATUS_TODO.INPROGRESS && styles.inprogress} ${
        todo.status === STATUS_TODO.COMPLETED && styles.completed
      }`}
    >
      {!isEdit ? (
        <>
          <span className={styles.content}>{todo.content}</span>
          <div className={styles.action_container}>
            <div
              className={styles.option_container}
              onClick={() => setIsEdit(true)}
            >
              <div className={styles.button_options}>
                <BiEdit />
              </div>
            </div>
            <ButtonOptions todo={todo} />
          </div>
        </>
      ) : (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateNote();
            }}
            className={styles.add_todo_container}
          >
            <div className={styles.box_add_todo}>
              <input
                value={textEdit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleUpdateNote();
                  }
                }}
                onChange={(e) => {
                  setTextEdit(e.target.value);
                }}
              />
            </div>
            <Button
              style={{
                padding: "10px",
                backgroundColor: "transparent",
                color: "white",
              }}
              onClick={() => {
                setTextEdit(todo.content);
                setIsEdit(false);
              }}
            >
              <BiRedo fontSize={24} />{" "}
            </Button>
            <Button type="submit" style={{ padding: "10px" }}>
              <BiSave fontSize={24} />{" "}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default TodoItem;
