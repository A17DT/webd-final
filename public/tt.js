function addRow() {
    const hourInput = document.getElementById("hourInput");
    const time = hourInput.value.trim();
    if (!time) return;

    const row = document.createElement("tr");
    const hourCell = document.createElement("td");
    hourCell.textContent = time;
    row.appendChild(hourCell);

    for (let i = 0; i < 7; i++) {
        const cell = document.createElement("td");
        cell.contentEditable = true;
        row.appendChild(cell);
    }

    document.getElementById("scheduleBody").appendChild(row);~
    hourInput.value = "";
}

document.getElementById('resetTable').addEventListener('click', () => {
    const tableBody = document.querySelector('#myTable tbody');
    tableBody.innerHTML = ''; 
});

