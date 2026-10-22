export function validateProcesses(processes) {
	if (processes.length === 0) {
		return "Add at least one process before running the simulation.";
	}

	const ids = processes.map(process => process.id);
	if (ids.some(id => !id)) {
		return "Every process must have an ID.";
	}
	if (new Set(ids).size !== ids.length) {
		return "Process IDs must be unique.";
	}
	if (processes.some(process =>
		!Number.isInteger(process.arrival) || process.arrival < 0
	)) {
		return "Arrival times must be non-negative integers.";
	}
	if (processes.some(process =>
		!Number.isInteger(process.burst) || process.burst < 1
	)) {
		return "Burst times must be positive integers.";
	}

	return null;
}
