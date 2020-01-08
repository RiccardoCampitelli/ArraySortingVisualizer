
function mergeSort(array, swapBars, lowerBound, upperBound) {

  lowerBound = lowerBound === undefined ? 0 : lowerBound;
  upperBound = upperBound === undefined ? array.length - 1 : upperBound;

  const middleIndex = Math.floor((upperBound + lowerBound) / 2);

  const leftLength = middleIndex - lowerBound;
  const rightLength = upperBound - middleIndex;

  if(lowerBound === upperBound)
    return;

  // if (leftLength <= 1 || rightLength <=1) {
    if(upperBound - lowerBound <= 1){
    console.log("returning", array.slice(lowerBound, upperBound))
    return {
      array,
      lowerBound,
      upperBound
    };
  }

  return merge(
    array,
    swapBars,
    mergeSort(array, swapBars, lowerBound, middleIndex),
    mergeSort(array, swapBars, middleIndex, upperBound)
  );
}

function merge(
  array,
  swapBars,
  { lowerBound: leftLower, upperBound: leftUpper },
  { lowerBound: rightLower, upperBound: rightUpper }
) {

  console.log("merging", array.slice(leftLower, leftUpper), array.slice(rightLower, rightUpper))


  let index = leftLower;
  let leftIndex = leftLower;
  let rightIndex = rightLower;

  let leftLength = leftUpper - leftLower;
  let rightLength = rightUpper - rightLower;


  while (leftIndex < leftUpper && rightIndex < rightUpper) {
    if (array[leftIndex] < array[rightIndex]) {
      console.log("swapping", array[index],array[leftIndex])
      swap(array, index, leftIndex);
      swapBars([index, leftIndex])
      leftIndex++;
    } else {
      // console.log("swapping", index, rightIndex)
      swap(array, index, rightIndex);
      swapBars([index, rightIndex])
      rightIndex++;
    }
    index++;
  }

  return {
    array,
    lowerBound : leftLower,
    upperBound: rightUpper
  };
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
  // console.log("swapping", array[leftIndex], array[rightIndex])
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
  quickSort,
  heapSort,
  bubbleSort
};

export default sortingAlgorithms;
