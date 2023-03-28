/** @jsxImportSource @emotion/react */
import React from "react";
import * as S from "./style";

const RemoveModal = (props) => {
  const closeModal = () => {
    props.setIsRemoveOpen(false);
  };

  const onSubmit = () => {
    props.onRemove(props.todo.id);
    closeModal();
  };

  return (
    <div css={S.ModalContainer}>
      <div css={S.ModalSection}>
        <div css={S.ModalHeader}>
          <h1 css={S.ModalTitle}>Todo 삭제</h1>
        </div>
        <div css={S.ModalMain}>
          <p css={S.ModalMessage}>Todo를 삭제 하시겠습니까?</p>
        </div>
        <div css={S.ModalFooter}>
          <button css={S.ModalOkButton} onClick={onSubmit}>
            확인
          </button>
          <button css={S.ModalCancelButton} onClick={closeModal}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveModal;
