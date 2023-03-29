/** @jsxImportSource @emotion/react */
import React from "react";
import * as S from "./style";
import { useState } from "react";

const PromptModal = (props) => {
  const [modalContent, setModalContent] = useState("");
  const closeModal = () => {
    props.setIsModifyOpen(false);
  };

  const contentChange = (e) => {
    setModalContent(e.target.value);
  };

  const onSubmit = () => {
    console.log(props.todo.id);
    props.onModify({
      id: props.todo.id,
      content: modalContent,
    });
    closeModal();
  };

  const onSubmitKeyUp = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };
  return (
    <div css={S.ModalContainer}>
      <div css={S.ModalSection}>
        <div css={S.ModalHeader}>
          <h1 css={S.ModalTitle}>Todo 수정</h1>
        </div>
        <div css={S.ModalMain}>
          <p css={S.ModalMessage}>
            {props.todo.date}
            {props.todo.time}
          </p>
          <input
            css={S.ModalInput}
            type="text"
            placeholder="Plase Enter Todo..."
            onChange={contentChange}
            onKeyUp={onSubmitKeyUp}
            defaultValue={null}
          />
        </div>
        <div css={S.ModalFooter}>
          <button css={S.ModalButton} onClick={onSubmit}>
            확인
          </button>
          <button css={S.ModalButton} onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptModal;
