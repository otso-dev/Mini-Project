import { css } from "@emotion/react";

export const style = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 300px;
  height: 100%;
  transition: left 1s ease;
  background-color: #454545;
`;

export const CloseStyle = css`
  position: absolute;
  top: 0;
  left: -300px;
  z-index: 99;
  width: 300px;
  height: 100%;
  transition: left 1s ease;
  background-color: #454545;
`;

export const side = css`
  background-color: #454545;
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

  &:hover {
    background-color: #454545;
    text-shadow: 0px 0px 5px #ffa100;
  }
`;
