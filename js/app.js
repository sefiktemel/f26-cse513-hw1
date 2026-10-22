import {
    calculateMetrics,
    calculateAverages
} from "./utils/metrics.js";

import {
    renderResultsTable
} from "./ui/table.js";
import { drawGantt } from "./ui/gantt.js";
import { workloadA, workloadB } from "./ui/workload.js";
import { Process } from "./models/Process.js";
import { runScheduler } from "./scheduler.js";
import { validateProcesses } from "./utils/validation.js";

const processTableBody = document.querySelector("#processTable tbody");
const algorithmSelect = document.getElementById("algorithm");
const quantumInput = document.getElementById("quantum");
const resultsContainer = document.getElementById("results");
let nextProcessNumber = 1;

function addProcess(process = {}) {
    const row = document.createElement("tr");
    const id = process.id ?? `P${nextProcessNumber}`;
    const arrival = process.arrival ?? 0;
    const burst = process.burst ?? 1;
    nextProcessNumber++;

    row.innerHTML = `
        <td><input type="text" aria-label="Process ID" value="${id}"></td>
        <td><input type="number" aria-label="Arrival time" min="0" step="1" value="${arrival}"></td>
        <td><input type="number" aria-label="Burst time" min="1" step="1" value="${burst}"></td>
        <td><button type="button" class="remove-process" aria-label="Remove process">Remove</button></td>
    `;
    processTableBody.appendChild(row);
}

function readProcesses() {
    return Array.from(processTableBody.rows, (row, inputOrder) => {
        const [id, arrival, burst] = row.querySelectorAll("input");
        return {
            id: id.value.trim(),
            arrival: arrival.value === "" ? NaN : Number(arrival.value),
            burst: burst.value === "" ? NaN : Number(burst.value),
            inputOrder
        };
    });
}

function loadWorkload(workload) {
    processTableBody.replaceChildren();
    nextProcessNumber = 1;
    workload.forEach(addProcess);
    resultsContainer.replaceChildren();
    document.getElementById("ganttChart").replaceChildren();
}

document.getElementById("addProcessBtn").addEventListener("click", () => addProcess());

processTableBody.addEventListener("click", event => {
    if (event.target.matches(".remove-process")) {
        event.target.closest("tr").remove();
    }
});

document.getElementById("loadWorkloadA").addEventListener("click", () => loadWorkload(workloadA));
document.getElementById("loadWorkloadB").addEventListener("click", () => loadWorkload(workloadB));

algorithmSelect.addEventListener("change", () => {
    quantumInput.disabled = algorithmSelect.value !== "RR";
});

document.getElementById("runBtn").addEventListener("click", () => {
    const inputs = readProcesses();
    const validationError = validateProcesses(inputs);

    if (validationError) {
        resultsContainer.textContent = validationError;
        resultsContainer.className = "error-message";
        document.getElementById("ganttChart").replaceChildren();
        return;
    }

    const quantum = Number(quantumInput.value);
    if (algorithmSelect.value === "RR" && (!Number.isInteger(quantum) || quantum < 1)) {
        resultsContainer.textContent = "Quantum must be a positive integer.";
        resultsContainer.className = "error-message";
        document.getElementById("ganttChart").replaceChildren();
        return;
    }

    resultsContainer.className = "";
    const processes = inputs.map(process =>
        new Process(process.id, process.arrival, process.burst, process.inputOrder)
    );
    const result = runScheduler(algorithmSelect.value, processes, quantum);
    const metrics = calculateMetrics(result.processes);
    const averages = calculateAverages(metrics);

    drawGantt(result.timeline);
    renderResultsTable(metrics, averages);
});

addProcess({ id: "P1", arrival: 0, burst: 5 });
quantumInput.disabled = algorithmSelect.value !== "RR";