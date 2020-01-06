import React, { useState, useRef } from "react";
import AppBar from "./AppBar";

import SortingVisualizer from "./SortingVisualizer";
import sortingAlgorithms from "../logic/sortingAlgorithms";
import { arraysAreEqual } from "../logic/util";

import useInterval from "../hooks/useInterval";

const ARRAY_LENGTH = 100;
const MIN_VALUE = 5;
const MAX_VALUE = 1000;

const ANIMATION_SPEED = 25;

const generateRandomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function generateRandomArray(length, minVal, maxVal) {
  const newArray = Array.from({ length: length }, () =>
    generateRandomIntFromInterval(minVal, maxVal)
  );

  return newArray;
}

function VisualSortingApp() {
  const [array, setArray] = useState(
    generateRandomArray(ARRAY_LENGTH, MIN_VALUE, MAX_VALUE)
  );

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("mergeSort");
  const [highlightedBars, setHighlightedBars] = useState([]);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(ANIMATION_SPEED);

  const [barsToHighlight, setBarsToHighlight] = useState([]);
  const [isSorting, setIsSorting] = useState(false);

  const animationsCount = useRef(0);
  const animationsToComplete = useRef([]);

  function randomizeArray() {
    setArray(generateRandomArray(ARRAY_LENGTH, MIN_VALUE, MAX_VALUE));
    setHighlightedBars([]);
    setAnimationIndex(0);
    setIsSorted(false);
    setIsSorting(false);
    setBarsToHighlight([]);
    animationsCount.current = 0;
    animationsToComplete.current = [];
  }

  function sortArray() {
    setIsSorting(true);
    const newArray = sortingAlgorithms[selectedAlgorithm]([...array], swapBars);

    const sortedJsArray = [...array].sort((a, b) => a - b);

    //For testing
    console.log(arraysAreEqual(newArray, sortedJsArray));
  }

  function animate() {
    const currentAnimationIndex = animationsCount.current;
    const barsToHighlight = animationsToComplete.current[currentAnimationIndex];
    let index1 = 0;
    let index2 = 0;

    if (barsToHighlight !== undefined && barsToHighlight.length === 2) {
      index1 = barsToHighlight[0];
      index2 = barsToHighlight[1];
    }

    setBarsToHighlight([index1, index2]);

    setArray(old => {
      const newArray = [...old];
      const temp = newArray[index1];

      newArray[index1] = newArray[index2];
      newArray[index2] = temp;

      return newArray;
    });

    if (currentAnimationIndex === animationsToComplete.current.length - 1) {
      setIsSorted(true);
      setHighlightedBars([]);
      animationsCount.current = 0;
      animationsToComplete.current = [];
      setAnimationIndex(0);
      setIsSorting(false);
      return;
    }

    animationsCount.current++;
  }

  useInterval(animate, isSorting ? animationSpeed : null);

  function swapBars([index1, index2]) {
    animationsToComplete.current = [
      ...animationsToComplete.current,
      [index1, index2]
    ];
  }

  return (
    <div>
      <AppBar
        randomizeArray={randomizeArray}
        sortArray={sortArray}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
      />
      <SortingVisualizer
        array={array}
        highlightedBars={highlightedBars}
        barsToHighlight={barsToHighlight}
        animationIndex={animationIndex}
        isSorted={isSorted}
      />
    </div>
  );
}

export default VisualSortingApp;
