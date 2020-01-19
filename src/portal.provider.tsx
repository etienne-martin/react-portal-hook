import React, { FC, createContext, useState } from "react";
import ReactDOM from "react-dom";
import { randomId } from "./portal.util";

export interface Portal {
  close: () => void;
}

interface PrivatePortal extends Portal {
  element: React.ReactPortal;
  id: string;
}

interface OpenOptions {
  shouldQueue?: boolean;
  shouldStack?: boolean;
  appendTo?: Element;
}

type OpenFunc = (
  Component: React.ReactElement,
  options?: OpenOptions
) => Portal;

type CloseFunc = (portalId: string) => void;

export interface PortalManager {
  open: OpenFunc;
}

export const PortalManagerContext = createContext<PortalManager | undefined>(
  undefined
);

export const PortalContext = createContext<Portal | undefined>(undefined);

export const PortalProvider: FC = ({ children }) => {
  const [portals, setPortals] = useState<PrivatePortal[]>([]);

  const open: OpenFunc = (element, options = {}) => {
    const { appendTo = document.body } = options;
    const portalId = randomId();

    if (!appendTo) {
      throw new Error("Trying to open a portal in a nonexistent DOM node");
    }

    const portal: Portal = {
      close: () => close(portalId)
    };

    const privatePortal: PrivatePortal = {
      ...portal,
      element: ReactDOM.createPortal(
        <PortalContext.Provider value={portal}>
          {element}
        </PortalContext.Provider>,
        appendTo
      ),
      id: portalId
    };

    setPortals(oldPortals => [...oldPortals, privatePortal]);

    return portal;
  };

  const close: CloseFunc = portalId => {
    setPortals(oldPortals => oldPortals.filter(({ id }) => id !== portalId));
  };

  return (
    <PortalManagerContext.Provider value={{ open }}>
      {children}
      {portals.map(({ element }) => element)}
    </PortalManagerContext.Provider>
  );
};
