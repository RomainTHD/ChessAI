import "mocha";
import {Chessboard} from "model";
import {performance} from "perf_hooks";
import {countFunction} from "./shared";

describe("Performance test", async () => {
    for (let _ = 0; _ < 10; ++_) {
        const n     = 10;
        const start = performance.now();

        for (let i = 0; i < n; ++i) {
            await countFunction(new Chessboard(), 3);
        }

        const end = performance.now();

        console.info(`Avg: ${(end - start) / n} ms`);
    }
});
