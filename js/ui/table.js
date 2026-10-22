export function renderResultsTable(metrics, averages) {

    const container = document.getElementById("results");

    container.innerHTML = "";

    const table = document.createElement("table");

    table.className = "results-table";

    table.innerHTML = `
        <thead>
            <tr>
                <th>Process</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>First Start</th>
                <th>Completion</th>
                <th>Turnaround</th>
                <th>Waiting</th>
                <th>Response</th>
            </tr>
        </thead>
        <tbody>
            ${metrics.map(metric => `
                <tr>
                    <td>${metric.id}</td>
                    <td>${metric.arrival}</td>
                    <td>${metric.burst}</td>
                    <td>${metric.firstStart}</td>
                    <td>${metric.completion}</td>
                    <td>${metric.turnaround}</td>
                    <td>${metric.waiting}</td>
                    <td>${metric.response}</td>
                </tr>
            `).join("")}
        </tbody>
    `;

    container.appendChild(table);

    const summary = document.createElement("div");

    summary.className = "averages";

    summary.innerHTML = `
        <h3>Average Metrics</h3>

        <p>
            Average Turnaround Time:
            <strong>${averages.turnaround.toFixed(2)}</strong>
        </p>

        <p>
            Average Waiting Time:
            <strong>${averages.waiting.toFixed(2)}</strong>
        </p>

        <p>
            Average Response Time:
            <strong>${averages.response.toFixed(2)}</strong>
        </p>
    `;

    container.appendChild(summary);
}