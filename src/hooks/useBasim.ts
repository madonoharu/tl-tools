"use client";
import { createContext, useContext } from "react";
import { Basim } from "basim";

export const BasimContext = createContext<Basim | null>(null);

export const useBasim = () => {
  const contextValue = useContext(BasimContext);

  if (!contextValue) {
    throw new Error("could not find context value");
  }

  return contextValue;
};
