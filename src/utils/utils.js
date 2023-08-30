import * as echarts from "echarts";

// Generates a random number between 0 (inclusive) and 1 (exclusive)
export const randomizeArray = (n) => {
  const max = 100,
    min = 1;
  const randomNumbers = [];
  for (let i = 0; i < n; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    randomNumbers.push({
      value: randomNumber,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 1, color: "lightblue" },
          { offset: 0, color: "slateBlue" },
        ]),
      },
    });
  }
  return randomNumbers;
};

// Bubble sort and return all the iterations
export const bubbleSortWithSteps = (initial = []) => {
  const iterations = [initial];

  const initializeCurrentState = (i, j) => {
    return iterations[iterations?.length - 1].map((item, index) => {
      let color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 1, color: "lightgray" },
        { offset: 0, color: "gray" },
      ]);
      if (index === j || index === j + 1) {
        color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 1, color: "yellow" },
          { offset: 0, color: "orange" },
        ]);
      } else if (index > initial?.length - i - 1) {
        color = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 1, color: "lightgreen" },
          { offset: 0, color: "green" },
        ]);
      }
      return { ...item, itemStyle: { color: color } };
    });
  };

  for (let i = 0; i < initial?.length; i++) {
    for (let j = 0; j < initial?.length - i - 1; j++) {
      let current = initializeCurrentState(i, j);
      if (current?.[j]?.value > current?.[j + 1]?.value) {
        const temp = current[j];
        current[j] = current[j + 1];
        current[j + 1] = temp;
      }
      iterations.push(current);
    }
  }

  const last = iterations[iterations?.length - 1].map((item) => ({
    ...item,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 1, color: "lightgreen" },
        { offset: 0, color: "green" },
      ]),
    },
  }));
  iterations.push(last);

  return iterations;
};

// Merge sort and return all the iterations
export const mergeSortWithSteps = (initial) => {
  const iterations = [initial];

  function mergeSort(arr, start, end) {
    if (start < end) {
      const middle = Math.floor((start + end) / 2);
      mergeSort(arr, start, middle);
      mergeSort(arr, middle + 1, end);

      merge(arr, start, middle, end);

      let currentArr = [...arr].map((item, index) => ({
        ...item,
        itemStyle: {
          color:
            index < end
              ? new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "darkgray" },
                  { offset: 0, color: "gray" },
                ])
              : new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 1, color: "lightblue" },
                  { offset: 0, color: "slateblue" },
                ]),
        },
      }));
      currentArr[middle] = {
        ...currentArr[middle],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: "yellow" },
            { offset: 0, color: "orange" },
          ]),
        },
      };
      currentArr[start] = {
        ...currentArr[start],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: "orange" },
            { offset: 0, color: "orangered" },
          ]),
        },
      };
      currentArr[end] = {
        ...currentArr[end],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 1, color: "lightgreen" },
            { offset: 0, color: "green" },
          ]),
        },
      };
      iterations.push(currentArr);
    }
  }

  function merge(arr, start, middle, end) {
    const leftArr = arr.slice(start, middle + 1);
    const rightArr = arr.slice(middle + 1, end + 1);

    let leftIndex = 0;
    let rightIndex = 0;
    let currentIndex = start;

    while (leftIndex < leftArr.length && rightIndex < rightArr.length) {
      if (leftArr[leftIndex].value <= rightArr[rightIndex].value) {
        arr[currentIndex] = leftArr[leftIndex];
        leftIndex++;
      } else {
        arr[currentIndex] = rightArr[rightIndex];
        rightIndex++;
      }
      currentIndex++;
    }

    while (leftIndex < leftArr.length) {
      arr[currentIndex] = leftArr[leftIndex];
      leftIndex++;
      currentIndex++;
    }

    while (rightIndex < rightArr.length) {
      arr[currentIndex] = rightArr[rightIndex];
      rightIndex++;
      currentIndex++;
    }
  }

  // Clone the initial array to avoid modifying it directly
  const clonedArray = initial.map((item) => ({ ...item }));

  mergeSort(clonedArray, 0, clonedArray.length - 1);

  const last = iterations[iterations?.length - 1].map((item) => ({
    ...item,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 1, color: "lightgreen" },
        { offset: 0, color: "green" },
      ]),
    },
  }));
  iterations.push(last);

  return iterations;
};
