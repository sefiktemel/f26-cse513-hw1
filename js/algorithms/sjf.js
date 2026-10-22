export function runSJF(processes) {

    const timeline = [];

    let currentTime = 0;
    let completedCount = 0;

    const totalProcesses = processes.length;

    while (completedCount < totalProcesses) {

        // Hazır süreçleri bul
        const readyQueue = processes.filter(
            p =>
                !p.completed &&
                p.arrivalTime <= currentTime
        );

        // CPU boşta
        if (readyQueue.length === 0) {

            const nextArrival = processes
                .filter(p => !p.completed)
                .reduce(
                    (min, p) =>
                        Math.min(min, p.arrivalTime),
                    Infinity
                );

            timeline.push({
                processId: "IDLE",
                start: currentTime,
                end: nextArrival
            });

            currentTime = nextArrival;
            continue;
        }

        // SJF seçimi
        readyQueue.sort((a, b) => {

            // Önce burst
            if (a.burstTime !== b.burstTime) {
                return a.burstTime - b.burstTime;
            }

            // Sonra arrival
            if (a.arrivalTime !== b.arrivalTime) {
                return a.arrivalTime - b.arrivalTime;
            }

            // Son olarak input sırası
            return a.inputOrder - b.inputOrder;
        });

        const process = readyQueue[0];

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
        completedCount++;
    }

    return {
        timeline,
        processes
    };
}