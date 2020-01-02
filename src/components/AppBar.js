import React from "react";

import styled from "styled-components";

const AppBarContainer = styled.div`
  background-color: #2b2b2b;
  height: 5vh;
  display: flex;
  flex-direction: row;
  align-content: center;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  color: #e0e0e0;
`;

function AppBar({ randomizeArray }) {



  return (
    <AppBarContainer>
      <Button onClick={randomizeArray}>Randomize</Button>
    </AppBarContainer>
  );
}

export default AppBar;
