import { css } from "@emotion/react";

export const MainContainer = css`
  margin: 10px auto;
  width: 550px;
  height: 100%;
`;

export const container = css`
  position: relative;
  margin: 50px auto;
  border: 2px solid #dbdbdb;
  width: 600px;
  height: 800px;
  background-color: #fff;
  overflow: hidden;
`;

export const TodoContentList = css`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  width: 100%;
  height: 88%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #dbdbdb;
    border-radius: 10px;
  }
`;

// ToDoContent
