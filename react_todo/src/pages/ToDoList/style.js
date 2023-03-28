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

export const MainHeader = css`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

export const MainTitle = css`
  margin: 20px 0px 0px 20px;
  font-size: 36px;
  font-weight: bold;
`;

export const InputContainer = css`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 3px;
  border-bottom: 1px solid #dbdbdb;
  padding-right: 50px;
  width: 70%;
  height: 40px;
`;

export const InputTodo = css`
  border: none;
  outline: none;
  padding: 0 70px;
  width: 100%;
  height: 100%;

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
  background-color: #fff;
  & :hover {
    background-color: #dbdbdb;
  }
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

export const TodoContent = css`
  margin: 10px;
  width: 230px;
  height: 230px;
  box-shadow: 0px 0px 5px 1px #dbdbdb;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 5px 1px #121212;
    transition: box-shadow 0.3s ease;
  }
`;

export const TodoContentHeader = css`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid #f0f0f0;
  padding: 10px;
  padding-bottom: 5px;
  height: 20%;
`;

export const TodoContentMain = css`
  padding: 10px;
  height: 65%;
  word-break: keep-all;
  line-height: 25px;
`;

export const TodoContentFooter = css`
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  padding-top: 0;
  height: 15%;
`;

export const TodoDate = css`
  display: flex;
  align-items: flex-start;
  height: 100%;
  font-size: 20px;
  line-height: 15px;
`;

export const TodoDateTime = css`
  display: flex;
  align-items: flex-end;
  font-size: 11px;
`;

export const ModifyButton = css`
  border: none;
  padding: 5px;
  font-weight: 600;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    background-color: #dbdbdb;
  }
`;

export const RemoveButton = css`
  border: none;
  padding: 5px;
  font-weight: 600;
  cursor: pointer;
  background-color: #fff;
  &:hover {
    background-color: #dbdbdb;
  }
`;
