/** @jsxImportSource @emotion/react */
import React from "react";
import * as S from "./style";
const TodoList = () => {
  return (
    <>
      <div css={S.container}>
        <header>
          <h1>ToDo</h1>
          <div>
            <input type="text" />
          </div>
          <button>+</button>
        </header>
      </div>
      ;
    </>
  );
};

export default TodoList;
