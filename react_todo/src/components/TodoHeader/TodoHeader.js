/** @jsxImportSource @emotion/react */
import Icon from "awesome-react-icons/lib/cjs/Icon";
import * as S from "./style";
import React from "react";

const TodoHeader = ({ onChange, onKeyUp, input, onAdd }) => {
  return (
    <header css={S.MainHeader}>
      <h1 css={S.MainTitle}>ToDo</h1>
      <div css={S.InputContainer}>
        <Icon name="calendar" />
        <input
          css={S.InputTodo}
          type="text"
          placeholder="Plase Enter Todo..."
          onChange={onChange}
          onKeyUp={onKeyUp}
          value={input.content}
        />
        <button css={S.AddButton} onClick={onAdd}>
          <Icon name="plus" />
        </button>
      </div>
    </header>
  );
};

export default TodoHeader;
