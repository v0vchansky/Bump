export const isCharALetter = (char: string) => {
    return char.toLowerCase() != char.toUpperCase();
};

export const hasSomeCharInString = (str: string) => {
    return str.split('').some(c => isCharALetter(c));
};
