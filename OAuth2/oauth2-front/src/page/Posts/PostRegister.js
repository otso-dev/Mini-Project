import axios from "axios";
import React, { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";

const PostRegister = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgFiles, setImgFiles] = useState([]);
  const fileId = useRef(1);

  const postRegisterSubmit = useMutation(async () => {
    const formData = new FormData(); //javascript => map이라고 생각하면 됨
    formData.append("title", title);
    formData.append("content", content);
    formData.append("userId", principal.data.data.userId);
    imgFiles.forEach((imgFile) => {
      formData.append("imgFiles", imgFile.file);
    });

    formData.forEach((value, key) => {
      console.log("key:" + key);
      console.log("value:" + value);
    });

    const option = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "multipart/form-data",
      },
    };
    const response = await axios.post("http://localhost:8080/post/register", formData, option);
    return response;
  });

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

  const titleOnChangeHandle = (e) => {
    setTitle(e.target.value);
  };

  const contentOnchangeHandle = (e) => {
    setContent(e.target.value);
  };

  const addimgFile = (e) => {
    const newImgFiles = [];

    for (const file of e.target.files) {
      const fileData = {
        id: fileId.current,
        file,
      };
      fileId.current += 1;
      newImgFiles.push(fileData);
    }

    setImgFiles([...imgFiles, ...newImgFiles]);
    e.target.value = null;
  };

  const removeFileHandle = (e) => {
    setImgFiles([...imgFiles.filter((imgFile) => imgFile.id !== parseInt(e.target.value))]);
  };

  const registerPostSubmitHandle = () => {
    postRegisterSubmit.mutate();
  };

  return (
    <div>
      <h3>제목</h3>
      <input type="text" onChange={titleOnChangeHandle} />
      <h3>작성자</h3>
      <input type="text" value={principal.data.data.name} disabled={true} />
      <h3>내용</h3>
      <textarea cols="30" rows="10" onChange={contentOnchangeHandle}></textarea>
      <h3>이미지 파일</h3>
      <input type="file" multiple={true} onChange={addimgFile} accept={".jpg,.png"} />

      <ul>
        {imgFiles.map((imgFile) => (
          <li key={imgFile.id}>
            {imgFile.file.name}{" "}
            <button value={imgFile.id} onClick={removeFileHandle}>
              삭제
            </button>
          </li>
        ))}
      </ul>
      <button onClick={registerPostSubmitHandle}>작성하기</button>
    </div>
  );
};

export default PostRegister;
