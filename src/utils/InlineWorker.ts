import assert from "assert";
import {Blob} from "node:buffer";
import {Worker} from "worker_threads";

class InlineWorker {
    private readonly _worker: Worker;

    public constructor(func: (worker: InlineWorker) => void) {
        assert(!!(Worker), "WebWorker not enabled");

        // const func = () => pubFunc(this);

        const functionBody = func.toString().replace(/^[^{]*{\s*/, "").replace(/\s*}[^}]*$/, "");
        // console.log(functionBody)

        this._worker = new Worker(URL.createObjectURL(
            new Blob([functionBody], {type: "text/javascript"}),
        ));

        this._worker.on("message", (evt) => {
            console.log("msg", evt);
        });

        this._worker.on("error", (err) => {
            console.log("err", err);
        });

        this._worker.on("messageerror", (err) => {
            console.log("msgerr", err);
        });

        this._worker.on("online", (evt: unknown) => {
            console.log("online", evt);
        });

        this._worker.on("exit", (code) => {
            console.log("exit", code);
        });

        /*
        this._worker.onmessage = (data) => {
            this.onMessage.next(data);
        };

        this._worker.onerror = (data) => {
            this.onError.next(data);
        };*/
    }

    public post(message: unknown) {
        this._worker.postMessage(message);
    }

    public onMessage(callback: (data: unknown) => void) {
        void callback;
        this._worker.addListener("message", (data: unknown) => {
            console.log(data, typeof data);
            callback(data);
        });
    }

    public onError(callback: unknown) {
        void callback;
        /*
        this._worker.addListener("message", (msg) => {
            console.log(msg, typeof msg);
            // callback();
        });*/
    }

    public terminate() {
        this._worker.terminate().then();
    }
}

export {InlineWorker};
