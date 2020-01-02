import React from "react";

import styled from "styled-components";

const AppBarContainer = styled.div`
  background-color: #2b2b2b;
  height: 5vh;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  color: ${props => (props.selected ? "#f7b5b5" : "#e0e0e0")};
  cursor: pointer;
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: ${props => props.width || undefined};
`;

function AppBar({
  randomizeArray,
  sortArray,
  selectedAlgorithm,
  setSelectedAlgorithm
}) {
  return (
    <AppBarContainer>
      <ButtonSection>
        <Button onClick={randomizeArray}>Randomize</Button>
        <Button onClick={sortArray}>Sort</Button>
      </ButtonSection>
      <ButtonSection width="70%">
        <Button
          selected={selectedAlgorithm === "mergeSort"}
          onClick={() => setSelectedAlgorithm("mergeSort")}
        >
          Merge Sort
        </Button>
        <Button
          selected={selectedAlgorithm === "quickSort"}
          onClick={() => setSelectedAlgorithm("quickSort")}
        >
          Quick Sort
        </Button>
        <Button
          selected={selectedAlgorithm === "heapSort"}
          onClick={() => setSelectedAlgorithm("heapSort")}
        >
          Heap Sort
        </Button>
        <Button
          selected={selectedAlgorithm === "bubbleSort"}
          onClick={() => setSelectedAlgorithm("bubbleSort")}
        >
          Bubble Sort
        </Button>
      </ButtonSection>
    </AppBarContainer>
  );
}

export default AppBar;
