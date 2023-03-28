/** @jsxImportSource @emotion/react */
import Icon from "awesome-react-icons/lib/cjs/Icon";
import React from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Navigation } from "react-minimal-side-navigation/lib";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import MenuButton from "./MenuButton";

const Menu = () => {
  const navigate = useNavigate();
  return (
    <aside css={S.style}>
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
            itemId: "/UserInfomation",
            elemBefore: () => <Icon name="user" />,
          },
          {
            title: "TODOLIST",
            itemId: "/TodoList",
            elemBefore: () => <Icon name="check" />,
          },
        ]}
      />
      <MenuButton />
    </aside>
  );
};

export default Menu;
