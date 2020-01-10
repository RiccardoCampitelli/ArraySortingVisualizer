import React from "react";

import styled from "styled-components";

const AppBarContainer = styled.div`
  background-color: #2b2b2b;
  height: 5vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const Button = styled.button`
  border: none;
  background-color: inherit;
  color: ${props => (props.selected ? "#f7b5b5" : "#e0e0e0")};
  cursor: pointer;
`;

const AppBarSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${props => props.width || undefined};
`;

const Slider = styled.input`
  -webkit-appearance: none;
  appearance: none;
  width: 50%;
  height: 5px;
  border-radius: 2px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 15px; 
    height: 15px; 
    border-radius: 5px; 
    background: #4caf50; 
    cursor: pointer; 
  }
`;

const SliderLabel = styled.span`
  color: #e0e0e0;
  margin-right: 10px;
`;

function AppBar({
  randomizeArray,
  sortArray,
  selectedAlgorithm,
  setSelectedAlgorithm,
  animationSpeed,
  setAnimationSpeed
}) {
  function handleAnimationSpeedChange(evt) {
    evt.persist();
    setAnimationSpeed(evt.target.value);
  }

  return (
    <AppBarContainer>
      <AppBarSection>
        <Button onClick={randomizeArray}>Randomize</Button>
        <Button onClick={sortArray}>Sort</Button>
      </AppBarSection>
      <AppBarSection width="70%">
        <Button
          selected={selectedAlgorithm === "insertionSort"}
          onClick={() => setSelectedAlgorithm("insertionSort")}
        >
          Insertion Sort
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
      </AppBarSection>
      <AppBarSection>
        <SliderLabel>
         Speed {animationSpeed} (ms)
        </SliderLabel>
        <Slider
          type="range"
          min="1"
          max="100"
          value={animationSpeed}
          onChange={handleAnimationSpeedChange}
        />

      </AppBarSection>
    </AppBarContainer>
  );
}

export default AppBar;
