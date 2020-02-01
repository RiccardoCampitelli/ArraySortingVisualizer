import React from "react";

import useDimensions from "../hooks/useDimensions";

export const ScreenSizeContext = React.createContext({});

const MD_BREAKPOINT = 800;

const SM_BREAKPOINT = 400;

const ScreenSizeContextProvider = ({children}) => {
  const [ref, dimensions] = useDimensions({});

  let screenSize = "";

  if (dimensions) {
    const { width } = dimensions;

    if (width > MD_BREAKPOINT) screenSize = "lg";
    else if (width < MD_BREAKPOINT && width > SM_BREAKPOINT) screenSize = "md";
    else if (width < SM_BREAKPOINT) screenSize = "sm";
  }

  const value = {
    ref,
    screenSize
  };


  return (
    <ScreenSizeContext.Provider value={value}>
      <>{children}</>
    </ScreenSizeContext.Provider>
  );
};

export default ScreenSizeContextProvider;
