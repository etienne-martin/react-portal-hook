import { useContext } from "react";
import { PortalContext } from "./portal.provider";

export const usePortal = () => {
  const context = useContext(PortalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalRoot");
  }

  return context;
};
