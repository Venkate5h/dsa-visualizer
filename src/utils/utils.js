// Generates a random number between 0 (inclusive) and 1 (exclusive)
export const randomizeArray = (n) => {
    const max = 100, min = 1;
    const randomNumbers = [];
    for (let i = 0; i < n; i++) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        randomNumbers.push(randomNumber);
    }
    return randomNumbers;
}