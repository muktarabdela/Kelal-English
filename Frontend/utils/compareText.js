// utils/compareText.js
export const compareText = (original, spoken) => {
    const originalWords = original.split(' ');
    const spokenWords = spoken.split(' ');

    let matches = 0;
    originalWords.forEach((word, index) => {
        if (word === spokenWords[index]) {
            matches += 1;
        }
    });

    return (matches / originalWords.length) * 100;
};
