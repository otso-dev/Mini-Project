/** @jsxImportSource @emotion/react */
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import * as S from "./style";
import TodoHeader from "../../components/TodoHeader/TodoHeader";
import PromptModal from "./../../components/Modal/PromptModal/PromptModal";
import RemoveModal from "./../../components/Modal/RemoveModal/RemoveModal";
import TodoContent from "../../components/TodoContent/TodoContent";
import { useEffect } from "react";
const TodoList = () => {
  let today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const hours = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  const convertDay = (day) => {
    return day === 0
      ? "일"
      : day === 1
      ? "월"
      : day === 2
      ? "화"
      : day === 3
      ? "수"
      : day === 4
      ? "목"
      : day === 5
      ? "금"
      : "토";
  };
  const todoId = useRef(1);

  const [input, setInput] = useState({
    id: 0,
    content: "",
    date: `${year}.${month}.${day}(${convertDay(today.getDay())})`,
    time: `${hours}:${minutes}:${seconds}`,
    modifyFalg: false,
    RemoveFalg: false,
  });

  const [todoList, setTodoList] = useState(() => {
    const saveTodo = localStorage.getItem("todoList");
    return saveTodo ? JSON.parse(localStorage.getItem("todoList")) : [];
  });

  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [RemoveTodo, setRemoveTodo] = useState();
  const [modifyTodo, setModifyTodo] = useState({
    id: 0,
    content: "",
    date: `${year}.${month}.${day}(${convertDay(today.getDay())})`,
    time: `${hours}:${minutes}:${seconds}`,
  });

  useEffect(() => {
    const saveTodo = JSON.parse(localStorage.getItem("todoList"));
    if (saveTodo) {
      setTodoList(saveTodo);
    }
    const saveTodoId = JSON.parse(localStorage.getItem("todoId"));
    if (saveTodo) {
      todoId.current = saveTodoId;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  });

  useEffect(() => {
    localStorage.setItem("todoId", JSON.stringify(todoId.current));
  });

  const onChange = (e) => {
    setInput({
      ...input,
      content: e.target.value,
    });
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13) {
      onAdd();
    }
  };

  const onAdd = () => {
    const todo = {
      ...input,
      id: todoId.current++,
    };
    if (todo.content === "") {
      alert("Plase Todo Add...");
      return;
    }
    setTodoList([...todoList, todo]);
    setInput({ ...input, content: "" });
  };

  const onRemove = (id) => {
    console.log("remove");
    setTodoList(
      todoList.filter((todo) => {
        return todo.id !== id;
      })
    );
  };

  const onModify = (moidfyTodo) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === moidfyTodo.id) {
          todo.content = moidfyTodo.content;
        }
        return todo;
      })
    );
  };

  const openModifyModal = (id) => {
    setModifyTodo(todoList.filter((todo) => todo.id === id)[0]);
    setIsModifyOpen(true);
  };

  const openRemoveModal = (id) => {
    setRemoveTodo(todoList.filter((todo) => todo.id === id)[0]);
    setIsRemoveOpen(true);
  };

  return (
    <>
      <main css={S.MainContainer}>
        <TodoHeader onChange={onChange} onKeyUp={onKeyUp} input={input} onAdd={onAdd} />
        <ul css={S.TodoContentList}>
          {todoList.map((todo) => {
            return (
              <TodoContent
                todo={todo}
                openModifyModal={openModifyModal}
                openRemoveModal={openRemoveModal}
              />
            );
          })}
        </ul>
      </main>
      {isModifyOpen ? (
        <PromptModal todo={modifyTodo} setIsModifyOpen={setIsModifyOpen} onModify={onModify} />
      ) : (
        ""
      )}
      {isRemoveOpen ? (
        <RemoveModal todo={RemoveTodo} setIsRemoveOpen={setIsRemoveOpen} onRemove={onRemove} />
      ) : (
        ""
      )}
      ;
    </>
  );
};

export default TodoList;
