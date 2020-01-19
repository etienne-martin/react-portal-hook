import { useContext } from "react";
import { PortalManagerContext, PortalContext } from "./portal.provider";

export const usePortalManager = () => {
  const context = useContext(PortalManagerContext);

  if (!context) {
    throw new Error("usePortalManager must be used within a PortalProvider");
  }

  return context;
};

export const usePortal = () => {
  const context = useContext(PortalContext);

  if (!context) {
    throw new Error(
      "usePortal must be used within a component initiated via a PortalManager"
    );
  }

  return context;
};
