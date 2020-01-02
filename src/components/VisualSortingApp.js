import React, { useState } from "react";
import AppBar from "./AppBar";

import styled from "styled-components";
import SortingVisualizer from "./SortingVisualizer";

const generateRandomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

function generateRandomArray(length ,minVal, maxVal){
    
    const newArray = Array.from({length: length}, ()=> generateRandomIntFromInterval(minVal, maxVal))

    return newArray;
}

function VisualSortingApp() {
  const [array, setArray] = useState(generateRandomArray(100 ,5, 1000));

  function generateArray(){
      setArray(generateRandomArray(100 ,5, 1000))
  }

  return (
    <div>
      <AppBar randomizeArray={generateArray}/>
      <SortingVisualizer array={array} />
    </div>
  );
}

export default VisualSortingApp;
