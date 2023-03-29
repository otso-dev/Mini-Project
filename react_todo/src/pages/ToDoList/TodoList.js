/** @jsxImportSource @emotion/react */
import Icon from "awesome-react-icons/lib/cjs/Icon";
import React from "react";
import { useRef } from "react";
import { useState } from "react";
import * as S from "./style";
import PromptModal from "./../../components/TodoList/Modal/PromptModal/PromptModal";
import RemoveModal from "../../components/TodoList/Modal/RemoveModal/RemoveModal";
import Menu from "../../components/Menu/Menu";
import TodoHeader from "../../components/TodoHeader/TodoHeader";
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

  const [todoList, setTodoList] = useState([]);

  const [isModifyOpen, setIsModifyOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [RemoveTodo, setRemoveTodo] = useState();
  const [modifyTodo, setModifyTodo] = useState({
    id: 0,
    content: "",
    date: `${year}.${month}.${day}(${convertDay(today.getDay())})`,
    time: `${hours}:${minutes}:${seconds}`,
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
      <div css={S.container}>
        <Menu />
        <main css={S.MainContainer}>
          <TodoHeader onChange={onChange} onKeyUp={onKeyUp} input={input} onAdd={onAdd} />
          <ul css={S.TodoContentList}>
            {todoList.map((todo) => {
              return (
                <li css={S.TodoContent}>
                  <div css={S.TodoContentHeader}>
                    <div css={S.TodoDate}>{todo.date}</div>
                    <div css={S.TodoDateTime}>{todo.time}</div>
                  </div>
                  <div css={S.TodoContentMain}>{todo.content}</div>
                  <div css={S.TodoContentFooter}>
                    <button css={S.ModifyButton} onClick={() => openModifyModal(todo.id)}>
                      <Icon name="edit-pencil-simple" />
                    </button>
                    <button css={S.RemoveButton} onClick={() => openRemoveModal(todo.id)}>
                      <Icon name="trash" />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
      </div>
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
