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
          { offset: 1, color: "lightgrey" },
          { offset: 0, color: "gray" },
        ]),
      },
    });
  }
  return randomNumbers;
};

// Set Color Gradient for Echarts
export const setColorGradient = (item, color = "gray") => {
  let color1 = "lightgrey";
  let color2 = "gray";
  switch (color) {
    case "green":
      color1 = "lightgreen";
      color2 = "green";
      break;
    case "orange":
      color1 = "orange";
      color2 = "orangered";
      break;
    case "yellow":
      color1 = "yellow";
      color2 = "orange";
      break;
    case "lightblue":
      color1 = "lightblue";
      color2 = "slateblue";
      break;
    case "gray":
      color1 = "lightgrey";
      color2 = "gray";
      break;
    default:
      color1 = color;
      color2 = color;
      break;
  }
  return {
    ...item,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 1, color: color1 },
        { offset: 0, color: color2 },
      ]),
    },
  };
};

// Bubble sort and return all the iterations
export const bubbleSortWithSteps = (initial = []) => {
  const iterations = [initial];

  const initializeCurrentState = (i, j) => {
    return iterations[iterations?.length - 1].map((item, index) => {
      let color = "gray";
      if (index === j || index === j + 1) {
        color = "yellow";
      } else if (index > initial?.length - i - 1) {
        color = "green";
      }
      return setColorGradient(item, color);
    });
  };

  for (let i = 0; i < initial?.length; i++) {
    for (let j = 0; j < initial?.length - i - 1; j++) {
      let current = initializeCurrentState(i, j);
      iterations.push([...current]);

      if (current?.[j]?.value > current?.[j + 1]?.value) {
        const temp = current[j];
        current[j] = current[j + 1];
        current[j + 1] = temp;

        current[j] = setColorGradient(current[j], "orange");
        current[j + 1] = setColorGradient(current[j + 1], "green");
        iterations.push([...current]);
      }
    }
  }

  const last = iterations[iterations?.length - 1].map((item) =>
    setColorGradient(item, "green")
  );
  iterations.push(last);

  return iterations;
};

// Merge sort and return all the iterations
export const mergeSortWithSteps = (initial) => {
  const iterations = [initial];

  function mergeSort(arr, start, end) {
    if (start < end) {
      const middle = Math.floor((start + end) / 2);
      const currentArr = [...arr].map((item, index) =>
        setColorGradient(item, index < start ? "lightgreen" : "gray")
      );
      currentArr[start] = setColorGradient(currentArr[start], "yellow");
      currentArr[middle] = setColorGradient(currentArr[middle], "orange");
      currentArr[end] = setColorGradient(currentArr[end], "yellow");
      iterations.push(currentArr);

      mergeSort(arr, start, middle);
      mergeSort(arr, middle + 1, end);
      merge(arr, start, middle, end);
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
    const mergedArr = [...arr].map((item, index) =>
      setColorGradient(item, index < end ? "lightgreen" : "gray")
    );
    mergedArr[middle] = setColorGradient(mergedArr[middle], "orange");
    mergedArr[start] = setColorGradient(mergedArr[start], "lightgreen");
    mergedArr[end] = setColorGradient(mergedArr[end], "lightgreen");
    iterations.push([...mergedArr]);
  }

  // Clone the initial array to avoid modifying it directly
  const clonedArray = initial.map((item) => ({ ...item }));

  mergeSort(clonedArray, 0, clonedArray.length - 1);

  const last = iterations[iterations?.length - 1].map((item) =>
    setColorGradient(item, "green")
  );
  iterations.push(last);

  return iterations;
};

// Insertion sort and return all the iterations
export const insertionSortWithSteps = (initial) => {
  const iterations = [[...initial]];
  for (let i = 1; i < initial.length; i++) {
    const currentValue = initial[i];
    let j;
    for (j = i - 1; j >= 0 && initial[j]?.value > currentValue?.value; j--) {
      let currentArr = [...iterations[iterations.length - 1]].map(
        (item, index) => setColorGradient(item, index < i ? "green" : "gray")
      );
      currentArr[i] = setColorGradient(currentArr[i], "orange");
      currentArr[j] = setColorGradient(currentArr[j], "yellow");
      iterations.push([...currentArr]);
      initial[j + 1] = initial[j];
    }
    initial[j + 1] = currentValue;
    const currentArr = [...initial].map((item, index) =>
      setColorGradient(item, index <= i ? "green" : "gray")
    );
    currentArr[j + 1] = setColorGradient(currentArr[j + 1], "orange");
    iterations.push([...currentArr]);
  }
  const last = [...initial].map((item) => setColorGradient(item, "green"));
  iterations.push([...last]);
  return iterations;
};

//Selection sort and return all the iterations
export const selectionSortWithSteps = (initial) => {
  const iterations = [[...initial]];
  const n = initial.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      let currentArr = [...initial].map((item, index) =>
        setColorGradient(item, index < i ? "green" : "gray")
      );
      currentArr[i] = setColorGradient(currentArr[i], "green");
      currentArr[minIndex] = setColorGradient(currentArr[minIndex], "orange");
      currentArr[j] = setColorGradient(currentArr[j], "yellow");
      iterations.push([...currentArr]);
      if (initial[j]?.value < initial[minIndex]?.value) {
        minIndex = j;
        currentArr = [...initial].map((item, index) =>
          setColorGradient(item, index < i ? "green" : "gray")
        );
        currentArr[i] = setColorGradient(currentArr[i], "green");
        currentArr[minIndex] = setColorGradient(currentArr[minIndex], "orange");
        iterations.push([...currentArr]);
      }
    }

    if (minIndex !== i) {
      // Swap the elements
      [initial[i], initial[minIndex]] = [initial[minIndex], initial[i]];
      let currentArr = [...initial].map((item, index) =>
        setColorGradient(item, index < i ? "green" : "gray")
      );
      currentArr[i] = setColorGradient(currentArr[i], "orange");
      currentArr[minIndex] = setColorGradient(currentArr[minIndex], "green");
      iterations.push([...currentArr]);
    }
  }
  const last = [...initial].map((item) => setColorGradient(item, "green"));
  iterations.push([...last]);
  return iterations;
};
