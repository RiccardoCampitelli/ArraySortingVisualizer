function mergeSort(
  array,
  swapBars,
  lowerBound = 0,
  upperBound = array.length - 1,
  auxiliaryArray = [...array]
) {
  // lowerBound = lowerBound === undefined ? 0 : lowerBound;
  // upperBound = upperBound === undefined ? array.length - 1 : upperBound;

  const middleIndex = Math.floor((upperBound + lowerBound) / 2);

  // if (leftLength <= 1 || rightLength <=1) {
  if (upperBound - lowerBound <= 1) {
    console.log("returning", array.slice(lowerBound, upperBound));
    return {
      array,
      lowerBound,
      upperBound
    };
  }

  return merge(
    array,
    swapBars,
    mergeSort(array, swapBars, lowerBound, middleIndex, auxiliaryArray),
    mergeSort(array, swapBars, middleIndex, upperBound, auxiliaryArray),
    auxiliaryArray
  );
}

function merge(
  array,
  swapBars,
  { lowerBound: leftLower, upperBound: leftUpper },
  { lowerBound: rightLower, upperBound: rightUpper },
  auxiliaryArray
) {
  console.log(
    "merging",
    array.slice(leftLower, leftUpper),
    array.slice(rightLower, rightUpper)
  );

  console.log(leftLower, rightLower);

  let index = leftLower;
  let leftIndex = leftLower;
  let rightIndex = rightLower;

  let hasBeenSwapped = [];
  //use aux when comparing
  while (leftIndex < leftUpper && rightIndex < rightUpper) {
    console.log(
      array[leftIndex],
      leftIndex,
      "<",
      array[rightIndex],
      rightIndex
    );
    if (auxiliaryArray[leftIndex] < auxiliaryArray[rightIndex]) {
      // console.log("swapping", array[index], array[leftIndex]);
      // console.log("swapping")
      swap(array, index, leftIndex);
      swapBars([index, leftIndex]);
      leftIndex++;
      index++;
    } else {
      // console.log("swapping", index, rightIndex)
      swap(array, index, rightIndex);
      swapBars([index, rightIndex]);
      rightIndex++;
      index++;
    }
  }

  console.log("left", leftUpper - leftIndex);
  console.log("right", rightUpper - rightIndex);

  // while(leftIndex < leftUpper){
  //   console.log(index, leftIndex)
  //   swap(array, index, leftIndex)
  //   swapBars([index, leftIndex]);

  //   index++;
  //   leftIndex++;
  // }

  // while(rightIndex < rightUpper){
  //   console.log(index, rightIndex)
  //   swap(array, index, rightIndex);
  //   swapBars([index, rightIndex]);

  //   index++;
  //   rightIndex++;
  // }

  return {
    array,
    lowerBound: leftLower,
    upperBound: rightUpper
  };
}

function insertionSort(array, swapBars) {
  // const length = array.length;

  for (let index = 1; index < array.length; index++) {
    const element = array[index];

    // let secondIndex = 0;

    for (let secondIndex = index -1; secondIndex >= 0; secondIndex--) {
      const elementToCompare = array[secondIndex];
      
      if(elementToCompare < element){

        swap(array, secondIndex, secondIndex + 1);
        swapBars([secondIndex, secondIndex + 1])

      }

    }

    
  }

  return array;
}

function quickSort(array, swapBars, leftIndex = 0, rightIndex) {
  rightIndex = rightIndex === undefined ? array.length - 1 : rightIndex;
  let partitionIndex;

  if (array.length > 1) {
    partitionIndex = partition(array, swapBars, leftIndex, rightIndex);

    if (leftIndex < partitionIndex - 1) {
      quickSort(array, swapBars, leftIndex, partitionIndex - 1);
    }

    if (partitionIndex < rightIndex)
      quickSort(array, swapBars, partitionIndex, rightIndex);
  }

  return array;
}

function partition(array, swapBars, leftIndex, rightIndex) {
  const middleIndex = Math.floor((leftIndex + rightIndex) / 2);
  const pivotElement = array[middleIndex];

  let i = leftIndex;
  let j = rightIndex;

  while (i <= j) {
    while (array[i] < pivotElement) i++;

    while (array[j] > pivotElement) j--;

    if (i <= j) {
      swapBars([i, j]);
      swap(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function swap(array, leftIndex, rightIndex) {
  console.log(
    "swapping",
    array[leftIndex],
    leftIndex,
    array[rightIndex],
    rightIndex
  );
  const temp = array[leftIndex];
  array[leftIndex] = array[rightIndex];
  array[rightIndex] = temp;
}

function heapSort(array, swapBars) {
  const length = array.length;
  let middleIndex = Math.floor(array.length / 2);
  let lengthMinusOne = length - 1;

  while (middleIndex >= 0) {
    makeHeap(array, swapBars, length, middleIndex);
    middleIndex--;
  }

  while (lengthMinusOne >= 0) {
    swap(array, 0, lengthMinusOne);
    swapBars([0, lengthMinusOne]);
    makeHeap(array, swapBars, lengthMinusOne, 0);
    lengthMinusOne--;
  }

  return array;
}

function makeHeap(array, swapBars, length, index) {
  console.log("make heap");
  let largest = index;
  let leftIndex = index * 2 + 1;
  let rightIndex = leftIndex + 1;

  if (leftIndex < length && array[leftIndex] > array[largest])
    largest = leftIndex;

  if (rightIndex < length && array[rightIndex] > array[largest])
    largest = rightIndex;

  if (largest !== index) {
    swap(array, index, largest);
    swapBars([index, largest]);

    makeHeap(array, swapBars, length, largest);
  }
  console.log("return from make heap");
  return array;
}

function bubbleSort(array, swapBars) {
  let length = array.length - 1;

  let hasSwapped = false;

  do {
    hasSwapped = false;
    for (let index = 0; index < length; index++) {
      if (array[index] > array[index + 1]) {
        console.log("swapping");
        swapBars([index, index + 1]);
        swap(array, index, index + 1);
        hasSwapped = true;
      }
    }

    length = length - 1;
  } while (hasSwapped);

  return [...array];
}

const sortingAlgorithms = {
  mergeSort,
  insertionSort,
  quickSort,
  heapSort,
  bubbleSort
};

export default sortingAlgorithms;
