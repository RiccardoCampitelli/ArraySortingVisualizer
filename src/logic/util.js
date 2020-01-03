function arraysAreEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  for (let index = 0; index < arr1.length; index++) {
    const element1 = arr1[index];
    const element2 = arr2[index];

    if (element1 !== element2) {
        console.log(element1, element2, index)
        return false
    };
  }

  return true;
}


export {
    arraysAreEqual
}
