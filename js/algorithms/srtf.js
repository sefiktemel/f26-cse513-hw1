export function runSRTF(processes) {
    const timeline = [];
    let currentTime = 0;
    let completedCount = 0;
    let current = null;

    function addSegment(processId, start, end) {
        const last = timeline[timeline.length - 1];
        if (last?.processId === processId && last.end === start) {
            last.end = end;
        } else {
            timeline.push({ processId, start, end });
        }
    }

    while (completedCount < processes.length) {
        const ready = processes.filter(
            process => !process.completed && process.arrivalTime <= currentTime
        );

        if (ready.length === 0) {
            const nextArrival = Math.min(
                ...processes.filter(process => !process.completed).map(process => process.arrivalTime)
            );
            addSegment("IDLE", currentTime, nextArrival);
            currentTime = nextArrival;
            current = null;
            continue;
        }

        ready.sort((a, b) => {
            return a.remainingTime - b.remainingTime ||
                a.arrivalTime - b.arrivalTime ||
                a.inputOrder - b.inputOrder;
        });
        const candidate = ready[0];

        if (
            current &&
            !current.completed &&
            current.remainingTime === candidate.remainingTime
        ) {
        } else {
            current = candidate;
        }

        if (current.firstStartTime === null) {
            current.firstStartTime = currentTime;
        }

        addSegment(current.id, currentTime, currentTime + 1);
        current.remainingTime--;
        currentTime++;

        if (current.remainingTime === 0) {
            current.completionTime = currentTime;
            current.completed = true;
            completedCount++;
            current = null;
        }
    }

    return { timeline, processes };
}