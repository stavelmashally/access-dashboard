import React from 'react';
import { Modal, Typography, Button } from '@material-ui/core';
import { confirmModalAtom } from 'plugins/dashboard/store/ui/atoms';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components/macro';

const modalVariants = {
  hidden: { top: '-50%', transition: { type: 'spring', duration: 0.4 } },
  visible: { top: '50%' },
  exit: { top: '-50%' },
};

const ConfirmModal = () => {
  const { message, onConfirm } = useRecoilValue(confirmModalAtom);
  const close = useResetRecoilState(confirmModalAtom);

  const renderModalButtons = () => {
    return (
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
    );
  };

  return (
    <AnimatePresence>
      {!!onConfirm && (
        <Modal open onClose={() => close()}>
          <ModalContainer
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <Typography variant="h6">{message}</Typography>
            {renderModalButtons()}
          </ModalContainer>
        </Modal>
      )}
    </AnimatePresence>
  );
};

const ModalContainer = styled(motion.div)`
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
