import { css } from "@emotion/react";

export const style = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 300px;
  height: 100%;

  background-color: #dbdbdb;
`;

export const MenuButton = css`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  right: -13px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  padding: 0;

  height: 60px;

  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;

  color: #ffa100;
  background-color: #454545;
  cursor: pointer;
`;
