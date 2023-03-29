import { css } from "@emotion/react";

export const ModalContainer = css`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #000000dd;
`;
export const ModalSection = css`
  border-radius: 2px;
  padding: 2px;
  width: 350px;
  height: 200px;
  background-color: #fff;
`;
export const ModalHeader = css`
  display: flex;
  align-items: center;
  padding: 0px 10px;
  height: 20%;
`;
export const ModalTitle = css`
  margin: 0;
  padding: 0;
  font-weight: 600;
`;
export const ModalMain = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 60%;
`;
export const ModalMessage = css`
  margin: 0;
  padding: 0;
`;
export const ModalFooter = css`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 0px 10px;
  height: 20%;
`;
export const ModalOkButton = css`
  border: 1px solid #dbdbdb;
  padding: 5px 10px;
  background-color: #fff;
  font-weight: 600;
  cursor: pointer;
`;
export const ModalCancelButton = css`
  border: 1px solid #dbdbdb;
  padding: 5px 10px;
  background-color: #fff;
  font-weight: 600;
  cursor: pointer;
`;
