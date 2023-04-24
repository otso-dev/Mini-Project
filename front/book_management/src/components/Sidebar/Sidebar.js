/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React, { useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { BiLike, BiHome, BiListUl, BiLogOut } from "react-icons/bi";
import ListButton from "./ListButton/ListButton";
import { useQuery } from "react-query";
import axios from "axios";

const sidebar = (isOpen) => css`
  position: absolute;
  display: flex;
  left: ${isOpen ? "10px" : `-240px`};
  flex-direction: column;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  width: 250px;
  box-shadow: -1px 0px 5px #dbdbdb;
  transition: left 1s ease;
  background-color: white;
  ${isOpen ? " " : `cursor: pointer`};
  ${isOpen
    ? " "
    : `&:hover {
    left: -230px}`}
`;

const header = css`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 10px;
`;

const userIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  border-radius: 8px;
  width: 45px;
  height: 45px;
  background-color: #713fff;
  color: white;
  font-size: 30px;
  font-weight: 600;
`;

const userInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const userName = css`
  font-size: 18px;
  font-weight: 600;
  padding: 5px;
  padding-top: 0px;
`;
const userEmail = css`
  font-size: 12px;
`;

const closeButton = css`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dbdbdb;
  padding-left: 0.9px;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  font-size: 12px;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;

const main = css`
  padding: 10px;
  border-bottom: 1px solid #dbdbdb;
`;

const footer = css`
  padding: 10px;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useQuery(["principal"], async () => {
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.get(
      "http://localhost:8080/auth/principal",
      { params: { accessToken } },
      {
        enabled: accessToken,
      }
    );
    return response;
  });
  const sidebarOpenClickHandler = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  const sidebarCloseClickHandler = () => {
    setIsOpen(false);
  };
  if (isLoading) {
    return <>로딩중....</>;
  }

  const logoutClickHandler = () => {
    if (window.confirm("로그아웃하시겠습니까?")) {
      localStorage.removeItem("accessToken");
    }
  };

  if (!isLoading)
    return (
      <div onClick={sidebarOpenClickHandler} css={sidebar(isOpen)}>
        <header css={header}>
          <div css={userIcon}>{data.data.name.substr(0, 1)}</div>
          <div css={userInfo}>
            <h1 css={userName}>{data.data.name}</h1>
            <p css={userEmail}>{data.data.email}</p>
          </div>
          <div css={closeButton} onClick={sidebarCloseClickHandler}>
            <GrFormClose />
          </div>
        </header>
        <main css={main}>
          <ListButton title="Dashboard">
            <BiHome />
          </ListButton>
          <ListButton title="Likes">
            <BiLike />{" "}
          </ListButton>
          <ListButton title="Rental">
            <BiListUl />
          </ListButton>
        </main>
        <footer css={footer}>
          <ListButton title="Logout" onClick={logoutClickHandler}>
            <BiLogOut />
          </ListButton>
        </footer>
      </div>
    );
};

export default Sidebar;
