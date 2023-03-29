import * as S from "./style";
/** @jsxImportSource @emotion/react */
import React from "react";
const MenuButton = ({ isOpen, MenuClick }) => {
  return isOpen ? (
    <button css={S.MenuButton} onClick={MenuClick}>
      ◀
    </button>
  ) : (
    <button css={S.MenuButton} onClick={MenuClick}>
      ▶
    </button>
  );
};

export default MenuButton;
