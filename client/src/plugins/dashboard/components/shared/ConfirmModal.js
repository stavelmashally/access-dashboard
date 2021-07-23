import React from 'react';
import { Modal, Typography, Button } from '@material-ui/core';
import { confirmModalAtom } from 'plugins/dashboard/store';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import styled from 'styled-components/macro';

const ConfirmModal = () => {
  const { message, onConfirm } = useRecoilValue(confirmModalAtom);
  const close = useResetRecoilState(confirmModalAtom);

  return (
    <Modal open={!!onConfirm} onClose={() => close()}>
      <ModalContainer>
        <Typography variant="h6">{message}</Typography>
        <ButtonsContainer>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              close();
              onConfirm?.();
            }}
          >
            Submit
          </Button>
          <Button variant="contained" onClick={() => close()}>
            Cancel
          </Button>
        </ButtonsContainer>
      </ModalContainer>
    </Modal>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 18px -6px rgba(0, 0, 0, 0.75);
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

export default ConfirmModal;
