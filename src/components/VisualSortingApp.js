import React, { useState, useEffect, useRef } from "react";
import AppBar from "./AppBar";

import styled from "styled-components";
import SortingVisualizer from "./SortingVisualizer";
import sortingAlgorithms from "../logic/sortingAlgorithms";
import { arraysAreEqual } from "../logic/util";

const ARRAY_LENGTH = 100;
const MIN_VALUE = 5;
const MAX_VALUE = 1000;

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

  const animationsCount = useRef(0);

  function randomizeArray() {
    setArray(generateRandomArray(ARRAY_LENGTH, MIN_VALUE, MAX_VALUE));
    setHighlightedBars([]);
    animationsCount.current = 0;
    setAnimationIndex(0);
    setIsSorted(false);
  }

  function sortArray() {
    const newArray = sortingAlgorithms[selectedAlgorithm]([...array], swapBars);

    const sortedJsArray = [...array].sort((a, b) => a - b);

    //For testing
    console.log(arraysAreEqual(newArray, sortedJsArray));
  }

  function swapBars([index1, index2]) {
    const currentAnimationCycle = animationsCount.current;
    animationsCount.current++;

    const animationDelay = animationsCount.current * 100;

    setTimeout(() => {
      setHighlightedBars(old => [...old, [index1, index2]]);

      setTimeout(() => {
        setAnimationIndex(currentAnimationCycle);

        // console.log(currentAnimationCycle, animationsCount.current);
        setArray(old => {
          const newArray = [...old];
          const temp = newArray[index1];

          newArray[index1] = newArray[index2];
          newArray[index2] = temp;

          return newArray;
        });

        if (currentAnimationCycle === animationsCount.current - 1) {
          setIsSorted(true);
          setHighlightedBars([]);
          animationsCount.current = 0;
          setAnimationIndex(0);
        }
      }, animationDelay + 100);
    }, animationDelay);
  }

  return (
    <div>
      <AppBar
        randomizeArray={randomizeArray}
        sortArray={sortArray}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
      <SortingVisualizer
        array={array}
        highlightedBars={highlightedBars}
        animationIndex={animationIndex}
        isSorted={isSorted}
      />
    </div>
  );
}

export default VisualSortingApp;
