import React, { useState, useRef, useContext } from "react";

import styled from "styled-components";

import useDimensions from "../hooks/useDimensions";
import { ScreenSizeContext } from "../context/screenSizeContext";

import Dropdown from "./Dropdown";

const MAX_ANIMATION_SPEED = 200;

const AppBarContainer = styled.div`
  background-color: #2b2b2b;
  height: 5vh;
  margin-bottom: 5vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  -webkit-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  border: none;
  height: 100%;
  background-color: inherit;
  color: ${props => (props.selected ? "#f7b5b5" : "#e0e0e0")};
  border-bottom: ${props =>
    props.selected ? "3px solid #f7b5b5" : "3px solid #2b2b2b"};
  cursor: pointer;
  &:focus {
    outline: none;
  }

  &:hover {
    color: #f7b5b5;
  }

  transition: all 0.3s ease-in;
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

const ToolTip = styled.span`
  display: block;
  position: absolute;
  background-color: #4caf50;
  text-align: center;
  color: #f0eeeb;
  padding: 5px;
  border-radius: 5px;
  top: ${props => (props.top ? `${props.top}px` : 0)};
  left: ${props => (props.left ? `${props.left}px` : 0)};
  opacity: ${props => (props.showing ? 1 : 0)};
  cursor: default;

  &::after {
    content: " ";
    position: absolute;
    left: 50%;
    bottom: 100%; /* To the right of the tooltip */
    margin-top: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #4caf50 transparent;
  }

  transition: opacity 0.5s ease-in-out;
`;

//TODO:
//only show stop and start if sorting
//reposition buttons on navbar
//disable algorithm buttons when sorting
//improve speed slider
//think about mobile (not sure what to do with bars )

function AppBar({
  randomizeArray,
  sortArray,
  selectedAlgorithm,
  setSelectedAlgorithm,
  animationSpeed,
  setAnimationSpeed
}) {
  const { screenSize } = useContext(ScreenSizeContext);

  const [isHoveringSpeed, setIsHoveringSpeed] = useState(false);

  const sliderLabelRef = useRef(null);
  const [tooltipRef, tooltipDimensions] = useDimensions({});

  function handleAnimationSpeedChange(evt) {
    evt.persist();
    setAnimationSpeed(evt.target.value);
  }

  const sliderSectionMouseEnter = () => {
    setIsHoveringSpeed(true);
  };

  const sliderSectionMouseLeave = () => {
    setIsHoveringSpeed(false);
  };

  let top = 0;
  let left = 0;

  if (sliderLabelRef.current && tooltipDimensions) {
    const {
      offsetTop,
      offsetLeft,
      scrollWidth,
      scrollHeight
    } = sliderLabelRef.current;

    const { height, width } = tooltipDimensions;

    top = offsetTop + scrollHeight / 2 + height / 2 + 10;
    left = offsetLeft + scrollWidth / 2 - width / 2;
  }

  return (
    <AppBarContainer>
      <AppBarSection>
        <Button onClick={randomizeArray}>Randomize</Button>
        <Button onClick={sortArray}>Sort</Button>
      </AppBarSection>
      {screenSize === "lg" ? (
        <AppBarSection width="70%">
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
          <Button
            selected={selectedAlgorithm === "insertionSort"}
            onClick={() => setSelectedAlgorithm("insertionSort")}
          >
            Insertion Sort
          </Button>
        </AppBarSection>
      ) : (
        <Dropdown options={["one", "two", "three"]} />
      )}
      <AppBarSection
        ref={sliderLabelRef}
        onMouseEnter={sliderSectionMouseEnter}
        onMouseLeave={sliderSectionMouseLeave}
      >
        {screenSize === "lg" && (
          <SliderLabel>{animationSpeed} (ms)</SliderLabel>
        )}
        <Slider
          type="range"
          min={10}
          step={10}
          max={MAX_ANIMATION_SPEED}
          value={animationSpeed}
          onChange={handleAnimationSpeedChange}
        />
      </AppBarSection>
      <ToolTip showing={isHoveringSpeed} ref={tooltipRef} top={top} left={left}>
        Animation Speed
      </ToolTip>
    </AppBarContainer>
  );
}

export default AppBar;
