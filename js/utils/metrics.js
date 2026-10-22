export function calculateMetrics(processes) {

    return processes.map(process => {

        const turnaround =
            process.completionTime -
            process.arrivalTime;

        const waiting =
            turnaround -
            process.burstTime;

        const response =
            process.firstStartTime -
            process.arrivalTime;

        return {
            id: process.id,
            arrival: process.arrivalTime,
            burst: process.burstTime,
            firstStart: process.firstStartTime,
            completion: process.completionTime,
            turnaround,
            waiting,
            response
        };
    });
}

export function calculateAverages(metrics) {

    const count = metrics.length;

    return {
        turnaround:
            metrics.reduce((s, p) => s + p.turnaround, 0) / count,

        waiting:
            metrics.reduce((s, p) => s + p.waiting, 0) / count,

        response:
            metrics.reduce((s, p) => s + p.response, 0) / count
    };
}