export function runFCFS(processes) {

    const timeline = [];

    const sorted = [...processes].sort((a, b) => {

        if (a.arrivalTime !== b.arrivalTime) {
            return a.arrivalTime - b.arrivalTime;
        }

        return a.inputOrder - b.inputOrder;
    });

    let currentTime = 0;

    for (const process of sorted) {

        // CPU idle
        if (currentTime < process.arrivalTime) {

            timeline.push({
                processId: "IDLE",
                start: currentTime,
                end: process.arrivalTime
            });

            currentTime = process.arrivalTime;
        }

        // First response
        if (process.firstStartTime === null) {
            process.firstStartTime = currentTime;
        }

        const start = currentTime;
        const end = currentTime + process.burstTime;

        timeline.push({
            processId: process.id,
            start,
            end
        });

        process.remainingTime = 0;
        process.completionTime = end;
        process.completed = true;

        currentTime = end;
    }

    return {
        timeline,
        processes
    };
}