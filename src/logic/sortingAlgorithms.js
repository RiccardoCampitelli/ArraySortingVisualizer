

function mergeSort(array) {
  const newArray = [...array];

  newArray.sort((a, b) => a - b);

  return [...newArray];
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
  const temp = array[leftIndex];
  array[leftIndex] = array[rightIndex];
  array[rightIndex] = temp;
}

function heapSort(array) {
  return [...array];
}

function bubbleSort(array, swapBars) {
  let length = array.length - 1;

  let hasSwapped = false;

  do {
    hasSwapped = false;
    for (let index = 0; index < length; index++) {
      if (array[index] > array[index + 1]) {

        console.log("swapping")
        swapBars([index, index + 1]);
        swap(array, index, index + 1);
        hasSwapped = true;
      }
    }

    length = length -1;
  } while (hasSwapped);

  return [...array];
}


const sortingAlgorithms = {
  mergeSort,
  quickSort,
  heapSort,
  bubbleSort
};


export default sortingAlgorithms;
