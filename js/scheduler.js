import { runFCFS } from "./algorithms/fcfs.js";
import { runSJF } from "./algorithms/sjf.js";
import { runSRTF } from "./algorithms/srtf.js";
import { runRR } from "./algorithms/rr.js";

export function runScheduler(
    algorithm,
    processes,
    quantum = 2
) {
    switch (algorithm) {

        case "FCFS":
            return runFCFS(processes);

        case "SJF":
            return runSJF(processes);

        case "SRTF":
            return runSRTF(processes);

        case "RR":
            return runRR(processes, quantum);

        default:
            throw new Error("Unknown algorithm");
    }
}