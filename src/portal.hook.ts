import { useContext } from "react";
import { PortalContext } from "./portal.provider";

export const usePortals = () => {
  const context = useContext(PortalContext);

  if (!context) {
    throw new Error("usePortals must be used within a PortalProvider");
  }

  return context;
};
