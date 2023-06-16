/** @jsxImportSource @emotion/react */
import Icon from "awesome-react-icons/lib/cjs/Icon";
import * as S from "./style";
import React from "react";

const TodoContent = ({ todo, openModifyModal, openRemoveModal }) => {
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
};

export default TodoContent;
