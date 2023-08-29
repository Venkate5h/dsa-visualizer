export const routes = [
  { label: "Bubble Sort", path: "bubbleSort" },
  { label: "Merge Sort", path: "mergeSort" },
  // { label: "Selection Sort", path: "selectionSort" },
  // { label: "Insertion Sort", path: "insertionSort" },
  // { label: "Quick Sort", path: "quickSort" },
  // { label: "Heap Sort", path: "heapSort" },
].sort((a, b) => a.label - b.label);

export const menuRoutes = [...routes].map((route) => ({
  ...route,
  key: route.path,
}));
