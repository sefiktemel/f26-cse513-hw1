export function runRR(processes, quantum = 2) {
	const timeline = [];
	const arrivals = [...processes].sort((a, b) =>
		a.arrivalTime - b.arrivalTime || a.inputOrder - b.inputOrder
	);
	const readyQueue = [];
	let nextArrivalIndex = 0;
	let currentTime = 0;
	let completedCount = 0;

	while (completedCount < processes.length) {
		while (
			nextArrivalIndex < arrivals.length &&
			arrivals[nextArrivalIndex].arrivalTime <= currentTime
		) {
			readyQueue.push(arrivals[nextArrivalIndex]);
			nextArrivalIndex++;
		}

		if (readyQueue.length === 0) {
			const nextArrival = arrivals[nextArrivalIndex].arrivalTime;
			timeline.push({ processId: "IDLE", start: currentTime, end: nextArrival });
			currentTime = nextArrival;
			continue;
		}

		const process = readyQueue.shift();
		if (process.firstStartTime === null) {
			process.firstStartTime = currentTime;
		}

		const duration = Math.min(quantum, process.remainingTime);
		const end = currentTime + duration;
		timeline.push({ processId: process.id, start: currentTime, end });
		process.remainingTime -= duration;
		currentTime = end;

		while (
			nextArrivalIndex < arrivals.length &&
			arrivals[nextArrivalIndex].arrivalTime <= currentTime
		) {
			readyQueue.push(arrivals[nextArrivalIndex]);
			nextArrivalIndex++;
		}

		if (process.remainingTime > 0) {
			readyQueue.push(process);
		} else {
			process.completionTime = currentTime;
			process.completed = true;
			completedCount++;
		}
	}

	return { timeline, processes };
}
