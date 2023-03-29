import { css } from "@emotion/react";
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
