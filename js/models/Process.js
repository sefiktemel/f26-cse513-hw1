export class Process {
    constructor(id, arrivalTime, burstTime, inputOrder = 0) {

        // Input values
        this.id = id;
        this.arrivalTime = Number(arrivalTime);
        this.burstTime = Number(burstTime);

        // Tie-breaking support
        this.inputOrder = inputOrder;

        // Runtime values
        this.remainingTime = Number(burstTime);

        // Metrics
        this.firstStartTime = null;
        this.completionTime = null;

        // Internal flags
        this.started = false;
        this.completed = false;
    }

    clone() {
        return new Process(
            this.id,
            this.arrivalTime,
            this.burstTime,
            this.inputOrder
        );
    }
}