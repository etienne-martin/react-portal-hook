import React, { FC, createContext, useState } from "react";
import ReactDOM from "react-dom";
import { randomId } from "./modal.util";

interface Modal {
  close: () => void;
}

interface PrivateModal extends Modal {
  element: React.ReactPortal;
  id: string;
}

interface ShowOptions {
  shouldQueue?: boolean;
  shouldStack?: boolean;
  appendTo?: Element;
}

type ShowFunc = (Component: React.ReactElement, options?: ShowOptions) => Modal;
type CloseFunc = (modalId: string) => void;

export interface ModalManager {
  show: ShowFunc;
}

export const ModalContext = createContext<ModalManager | undefined>(undefined);

export const ModalRoot: FC = ({ children }) => {
  const [modals, setModals] = useState<PrivateModal[]>([]);

  const show: ShowFunc = (element, options = {}) => {
    const { appendTo = document.body } = options;
    const modalId = randomId();

    const modal: Modal = {
      close: () => close(modalId)
    };

    const privateModal: PrivateModal = {
      ...modal,
      element: ReactDOM.createPortal(element, appendTo),
      id: modalId
    };

    setModals(oldModals => [...oldModals, privateModal]);

    return modal;
  };

  const close: CloseFunc = modalId => {
    setModals(oldModals => oldModals.filter(({ id }) => id !== modalId));
  };

  return (
    <ModalContext.Provider value={{ show }}>
      {children}
      {modals.map(({ element }) => element)}
    </ModalContext.Provider>
  );
};
