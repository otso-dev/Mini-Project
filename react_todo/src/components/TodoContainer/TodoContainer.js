/** @jsxImportSource @emotion/react */
import * as S from "./style";
import React from "react";

const TodoContainer = ({ children }) => {
  return <div css={S.container}>{children}</div>;
};

export default TodoContainer;
