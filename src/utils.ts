function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function shuffleArray(array: unknown[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [array[i as number], array[j as number]] = [array[j as number], array[i as number]];
    }
}

export {
    sleep,
    shuffleArray,
};
