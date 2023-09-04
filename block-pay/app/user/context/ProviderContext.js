"use client"
import React from "react";

const ProviderContext = React.createContext({
  provider: null,
  setProvider: () => {},
});

export default ProviderContext;
