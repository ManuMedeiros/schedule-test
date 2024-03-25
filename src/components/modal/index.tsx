import React from "react";
import ReactModal from "react-modal";

interface ModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: "#242424"
    },
  };

export const ModalRegister = ({ open, onClose, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={open}
      onAfterClose={onClose}
      onRequestClose={onClose}
      style={customStyles}
    >
      {children}
    </ReactModal>
  );
};
