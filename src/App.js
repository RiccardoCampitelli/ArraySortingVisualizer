import React from "react";
import VisualSortingApp from "./components/VisualSortingApp";
import ScreenSizeContextProvider from "./context/screenSizeContext";

function App() {
  return (
    <ScreenSizeContextProvider>
      <div className="App">
        <VisualSortingApp />
      </div>
    </ScreenSizeContextProvider>
  );
}

export default App;
