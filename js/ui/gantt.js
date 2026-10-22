export function drawGantt(timeline) {

    const container =
        document.getElementById("ganttChart");

    container.innerHTML = "";

    timeline.forEach(block => {

        const div = document.createElement("div");

        div.className = "gantt-block";

        div.textContent =
            `${block.processId} (${block.start}-${block.end})`;

        container.appendChild(div);
    });
}