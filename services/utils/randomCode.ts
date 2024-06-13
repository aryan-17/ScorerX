export function generateRandomCode(length: number): number {
    // Ensure length is a positive integer
    if (length <= 0) {
        throw new Error("Length must be a positive integer");
    }

    // Generate a random number with the specified length
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length) - 1;
    const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

    return randNum;
}
