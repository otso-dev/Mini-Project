/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import RentalList from "../../components/UI/BookDetail/RentalList/RentalList";

const mainContainer = css`
  padding: 10px;
`;

const BookDetail = () => {
  const { bookId } = useParams();
  const queryClient = useQueryClient();
  // console.log(queryClient.getQueriesData("principal")); //key값으로 저장된 reactquery를 꺼내서 쓰는 방법
  const getBook = useQuery(["getBook"], async () => {
    const option = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await axios.get(`http://localhost:8080/book/${bookId}`, option);
    return response;
  });

  const getLikeCount = useQuery(["getLikeCount"], async () => {
    const option = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await axios.get(`http://localhost:8080/book/${bookId}/like`, option);
    return response;
  });

  const getLikeStatus = useQuery(["getLikeStatus"], async () => {
    const option = {
      params: {
        userId: queryClient.getQueryData("principal").data.userId,
      },
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    const response = await axios.get(`http://localhost:8080/book/${bookId}/like/status`, option);
    return response;
  });

  const setLike = useMutation(
    async () => {
      const option = {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      return await axios.post(
        `http://localhost:8080/book/${bookId}/like`,
        JSON.stringify({
          userId: queryClient.getQueryData("principal").data.userId,
        }),
        option
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getLikeCount");
        queryClient.invalidateQueries("getLikeStatus");
      },
    }
  );

  const disLike = useMutation(
    async () => {
      const option = {
        params: {
          userId: queryClient.getQueryData("principal").data.userId,
        },
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      };
      return await axios.delete(`http://localhost:8080/book/${bookId}/like`, option);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getLikeCount");
        queryClient.invalidateQueries("getLikeStatus");
      },
    }
  );

  if (getBook.isLoading) {
    return <div>로딩중</div>;
  }

  return (
    <div css={mainContainer}>
      <Sidebar />
      <header>
        <h1>{getBook.data.data.bookName}</h1>
        <p>
          분류:{getBook.data.data.categoryName} /저자명:{getBook.data.data.authorName} / 출판사:
          {getBook.data.data.publisherName} / 추천: {getLikeCount.isLoading ? "조회중" : getLikeCount.data.data}
        </p>
      </header>
      <main>
        <div>
          <img src={getBook.data.data.coverImgUrl} alt={getBook.data.data.bookName} />
        </div>
        <div>
          <RentalList bookId={bookId} />
        </div>
        <div>
          {getLikeStatus.isLoading ? (
            ""
          ) : getLikeStatus.data.data === 0 ? (
            <button
              onClick={() => {
                setLike.mutate();
              }}
            >
              추천하기
            </button>
          ) : (
            <button
              onClick={() => {
                disLike.mutate();
              }}
            >
              추천취소
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default BookDetail;
