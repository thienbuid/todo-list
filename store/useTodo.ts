import ToDo, { STATUS_TODO } from "@/interfaces/todo.interface";
import { create } from "zustand";

const KEY_TODOS_LOCAL = "todos";

interface UseTodo {
  todos: ToDo[];
  initializeTodos: () => void;
  setTodos: (todos: ToDo[]) => void;
  addTodo: (todo: ToDo) => void;
  removeTodo: (todo: ToDo) => void;
  updateTodo: (todo: ToDo) => void;
  removeTodosByStatus: (status: STATUS_TODO) => void;
}

export const useTodo = create<UseTodo>()((set, get) => ({
  todos: [],

  initializeTodos: () => {
    const storedTodos = localStorage.getItem(KEY_TODOS_LOCAL);
    if (storedTodos) {
      const todos = JSON.parse(storedTodos);
      set({ todos: todos });
    }
  },

  setTodos: (todos) => {
    set({
      todos: todos,
    });
  },

  addTodo: (todo: ToDo) => {
    set((state) => {
      const newTodos = [...state.todos, todo];
      localStorage.setItem(KEY_TODOS_LOCAL, JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },

  removeTodo: (todo: ToDo) => {
    set((state) => {
      const newTodos = [...state.todos.filter((t) => t.id !== todo.id)];
      localStorage.setItem(KEY_TODOS_LOCAL, JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },

  updateTodo: (todo: ToDo) => {
    set((state) => {
      const newTodos = state.todos.map((t) => {
        if (t.id === todo.id) {
          return todo;
        } else {
          return t;
        }
      });

      localStorage.setItem(KEY_TODOS_LOCAL, JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },

  removeTodosByStatus: (status: STATUS_TODO) => {
    set((state) => {
      const newTodos = [...state.todos.filter((t) => t.status !== status)];
      localStorage.setItem(KEY_TODOS_LOCAL, JSON.stringify(newTodos));
      return { todos: newTodos };
    });
  },
}));
