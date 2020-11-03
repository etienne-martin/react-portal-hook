import React, { FC, createContext, useState } from "react";
import ReactDOM from "react-dom";
import { randomId } from "./portal.util";

export interface Portal {
  close: () => void;
}

interface PrivatePortal {
  element: React.ReactElement;
  id: string;
  appendTo: Element;
}

interface OpenOptions {
  id?: string;
  appendTo?: Element;
  onClose?: () => void;
}

type OpenFunc = (
  element: ((portal: Portal) => React.ReactElement) | React.ReactElement,
  options?: OpenOptions
) => void;

type CloseFunc = (portalId: string) => void;

export interface PortalManager {
  open: OpenFunc;
}

export const PortalContext = createContext<PortalManager | undefined>(
  undefined
);

export const PortalProvider: FC = ({ children }) => {
  const [portals, setPortals] = useState<PrivatePortal[]>([]);

  const open: OpenFunc = (element, options = {}) => {
    const {
      id: portalId = randomId(),
      appendTo = document.body,
      onClose
    } = options;

    // Skip if the portal already exists
    if (portals.find(({ id }) => id === portalId)) return;

    if (!appendTo) {
      throw new Error("Trying to open a portal in a nonexistent DOM node");
    }

    const portal: Portal = {
      close: () => {
        close(portalId);
        onClose?.();
      }
    };

    const portalElement =
      typeof element === "function" ? element(portal) : element;

    const privatePortal: PrivatePortal = {
      element: portalElement,
      id: portalId,
      appendTo
    };

    setPortals(oldPortals => [...oldPortals, privatePortal]);
  };

  const close: CloseFunc = portalId => {
    setPortals(oldPortals => oldPortals.filter(({ id }) => id !== portalId));
  };

  return (
    <PortalContext.Provider value={{ open }}>
      {children}
      {portals.map(({ element, appendTo, id }) => (
        <React.Fragment key={id}>
          {ReactDOM.createPortal(element, appendTo)}
        </React.Fragment>
      ))}
    </PortalContext.Provider>
  );
};
