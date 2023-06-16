import { css } from "@emotion/react";

export const style = (isOpen) => css`
  position: absolute;
  top: 0;
  left: ${isOpen ? "0" : "-300px"};
  z-index: 99;
  width: 300px;
  height: 100%;
  transition: left 1s ease;
  background-color: #454545;

  & .side-navigation-panel *,
  .side-navigation-panel:after,
  .side-navigation-panel:before {
    border-width: 0;
    box-sizing: border-box;
  }
  & .side-navigation-panel {
    background-color: #ffff00;
  }

  &
    .side-navigation-panel
    .side-navigation-panel-select
    .side-navigation-panel-select-wrap
    .side-navigation-panel-select-option-selected {
    background-color: #ff9933;
  }

  &
    .side-navigation-panel
    .side-navigation-panel-select
    .side-navigation-panel-select-wrap
    .side-navigation-panel-select-option:hover {
    background-color: #ff9933;
  }
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

  color: #ffff00;
  background-color: #454545;
  cursor: pointer;

  &:hover {
    background-color: #454545;
    text-shadow: 0px 0px 5px #ffff00;
  }
`;
