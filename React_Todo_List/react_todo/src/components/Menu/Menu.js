/** @jsxImportSource @emotion/react */
import Icon from "awesome-react-icons/lib/cjs/Icon";
import React from "react";
import "react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css";
import { Navigation } from "react-minimal-side-navigation/lib";
import { useLocation, useNavigate } from "react-router-dom";
import * as S from "./style";
import MenuButton from "./MenuButton/MenuButton";
import { useState } from "react";
import { useEffect } from "react";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const MenuClick = () => {
    setIsOpen(true);
    if (isOpen) {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  return (
    <>
      <aside css={S.style(isOpen)}>
        <Navigation
          activeItemId="/"
          onSelect={({ itemId }) => {
            navigate(itemId);
          }}
          items={[
            {
              title: "HOME",
              itemId: "/",
              elemBefore: () => <Icon name="settings" />,
            },
            {
              title: "TODOLIST",
              itemId: "/todo",
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
