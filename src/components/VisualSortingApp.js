import React, { useState } from "react";
import AppBar from "./AppBar";

import styled from "styled-components";
import SortingVisualizer from "./SortingVisualizer";
import sortingAlgorithms from "../logic/sortingAlgorithms";



const generateRandomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

function generateRandomArray(length, minVal, maxVal) {
  const newArray = Array.from({ length: length }, () =>
    generateRandomIntFromInterval(minVal, maxVal)
  );

  return newArray;
}

function VisualSortingApp() {
  const [array, setArray] = useState(generateRandomArray(100, 5, 1000));

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("mergeSort");

  function generateArray() {
    setArray(generateRandomArray(100, 5, 1000));
  }

  function sortArray(){
    sortingAlgorithms[selectedAlgorithm]();
  }

  return (
    <div>
      <AppBar
        randomizeArray={generateArray}
        sortArray={sortArray}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />
      <SortingVisualizer array={array} />
    </div>
  );
}

export default VisualSortingApp;
