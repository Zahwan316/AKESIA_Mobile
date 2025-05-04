type ModalHandlerProps = {
  setModal: (val: boolean) => void;
  setModalInfo: (val: { message: string; text: string }) => void;
  message: string;
  text: string;
};

const handleContentModal = ({ setModal, setModalInfo, message, text }: ModalHandlerProps) => {
  setModal(true);
  setModalInfo({ message, text });
};


export default handleContentModal;
