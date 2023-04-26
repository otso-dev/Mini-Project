/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

const mainContainer = css`
  padding: 10px;
`;

const BookDetail = () => {
  const { bookId } = useParams();
  const getBook = useQuery(["getBook"], async () => {});
  return (
    <div css={mainContainer}>
      <Sidebar />
      <header>
        <h1></h1>
        <p>분류: /저자명: / 출판사: / 추천:</p>
      </header>
      <main>
        <div>
          <img src="" alt="" />
        </div>
        <div></div>
        <div></div>
      </main>
    </div>
  );
};

export default BookDetail;
