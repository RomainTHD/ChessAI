import "mocha";
import {InlineWorker} from "utils/InlineWorker";

describe("Performance test", () => {
    const worker = new InlineWorker(() => {
        // START OF WORKER THREAD CODE
        console.log("Start worker thread, wait for postMessage: ");

        const calculateCountOfPrimeNumbers = (limit: number) => {
            const isPrime = (num: number) => {
                for (let i = 2; i < num; i++) {
                    if (num % i === 0) {
                        return false;
                    }
                }
                return num > 1;
            };

            let countPrimeNumbers = 0;

            while (limit >= 0) {
                if (isPrime(limit)) {
                    countPrimeNumbers += 1;
                }
                limit--;
            }

            // this is from DedicatedWorkerGlobalScope ( because of that we have postMessage and onmessage methods )
            // and it can't see methods of this class
            // @ts-ignore
            this.post({
                primeNumbers: countPrimeNumbers,
            });
        };

        // @ts-ignore
        this.onMessage((data: unknown) => {
            console.log("Calculation started: " + new Date());
            calculateCountOfPrimeNumbers((data as {limit: number}).limit);
        });
    });

    worker.post({
        limit: 300000
    });

    worker.onMessage((data: unknown) => {
        /*
        console.log("Calculation done: ", new Date() + " " + data.data);
        this.result = data.data.primeNumbers;
         */
        console.log(data)
        worker.terminate();
    });

    worker.onError((data: unknown) => {
        console.log(data);
    });

    console.log("finished ?")

    return;

    /*
    for (let _ = 0; _ < 10; ++_) {
        const n     = 10;
        const start = performance.now();

        for (let i = 0; i < n; ++i) {
            await countFunction(new Chessboard(), 3);
        }

        const end = performance.now();

        console.info(`Avg: ${(end - start) / n} ms`);
    }*/
});
