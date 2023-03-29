/** @jsxImportSource @emotion/react */
import Icon from "awesome-react-icons/lib/cjs/Icon";
import React from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Navigation } from "react-minimal-side-navigation/lib";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import MenuButton from "./MenuButton";
import { useState } from "react";

const Menu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const MenuClick = () => {
    setIsOpen(true);
    if (isOpen) {
      setIsOpen(false);
    }
  };
  return (
    <>
      <aside css={isOpen ? S.style : S.CloseStyle}>
        <Navigation
          activeItemId="/"
          onSelect={({ itemId }) => {
            navigate(itemId);
          }}
          items={[
            {
              title: "TODOLIST",
              itemId: "/",
              elemBefore: () => <Icon name="settings" />,
            },
            {
              title: "UserInfomation",
              itemId: "/",
              elemBefore: () => <Icon name="user" />,
            },
            {
              title: "TODOLIST",
              itemId: "/",
              elemBefore: () => <Icon name="check" />,
            },
          ]}
        />
        <MenuButton isOpen={isOpen} MenuClick={MenuClick} />
      </aside>
    </>
  );
};

export default Menu;
