/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";

const mainContainer = css`
  padding: 10px;
`;

const BookDetail = () => {
  const { bookId } = useParams();
  const getBook = useQuery(["getBook"], async () => {
    const option = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await axios.get(`http://localhost:8080/book/${bookId}`, option);
    return response;
  });

  if (getBook.isLoading) {
    return <div>로딩중...</div>;
  }
  if (!getBook.isLoading)
    return (
      <div css={mainContainer}>
        <Sidebar />
        <header>
          <h1>{getBook.data.data.bookName}</h1>
          <p>
            분류: {getBook.data.data.categoryName}/저자명: {getBook.data.data.authorName}/ 출판사: {getBook.data.data.publisherName}/ 추천: 10
          </p>
        </header>
        <main>
          <div>
            <img src={getBook.data.data.coverImgUrl} alt={getBook.data.data.bookName} />
          </div>
          <div></div>
          <div></div>
        </main>
      </div>
    );
};

export default BookDetail;
