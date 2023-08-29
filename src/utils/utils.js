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
        color: "lightblue",
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
      let color = "lightblue";
      if (index === j || index === j + 1) {
        color = "orange";
      } else if (index > initial?.length - i - 1) {
        color = "green";
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
      color: "green",
    },
  }));
  iterations.push(last);

  return iterations;
};
