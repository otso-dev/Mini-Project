import { css } from "@emotion/react";

export const MainHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const MainTitle = css`
  margin: 20px 0px 0px 20px;
  font-size: 36px;
  font-weight: bold;
  color: #ffff66;
`;

export const InputContainer = css`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 3px;
  border-bottom: 1px solid #121212;
  padding-right: 60px;
  width: 70%;
  height: 40px;
`;

export const InputTodo = css`
  border: none;
  outline: none;
  padding: 0 60px;
  width: 100%;
  height: 100%;
  background-color: #454545;
  &:focus {
    padding: 0 10px;
    background-color: #dbdbdb;
    transition: all 1s ease;
  }
`;

export const AddButton = css`
  box-sizing: border-box;
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: 0px;
  border: none;
  padding: 5px 20px;
  height: 100%;
  cursor: pointer;
  background-color: #454545;
  &:hover {
    background-color: #dbdbdb;
  }
`;

export const Icon = css`
  font-size: 20px;
  margin: 8px;
  color: #ffff00;
`;
