import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

const PostRegister = () => {
  const principal = useQuery(["principal"], async () => {
    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const response = await axios.get("http://localhost:8080/account/principal", option);
    return response;
  });

  if (principal.isLoading) {
    return <></>;
  }

  return (
    <div>
      <h3>제목</h3>
      <input type="text" />
      <h3>작성자</h3>
      <input type="text" value={principal.data.data.name} disabled={true} />
      <h3>내용</h3>
      <textarea name="" id="" cols="30" rows="10" placeholder="내용"></textarea>
      <h3>이미지 파일</h3>
      <input type="file" multiple={true} />
    </div>
  );
};

export default PostRegister;
