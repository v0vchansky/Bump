export const randomInteger = (min: number, max: number) => {
    // случайное число от min до (max+1)
    const rand = min + Math.random() * (max + 1 - min);

    return Math.floor(rand);
};

export const randomLengthIntagerArray = (min: number, max: number) => {
    const rand = randomInteger(min, max);

    return new Array(rand).fill(0).map((_i, key) => key);
};
