let entries = JSON.parse(localStorage.getItem("entries")) || [];

document.addEventListener("DOMContentLoaded", () => {
    updateFinancialOverview();
    displayEntries();
});

function addEntry() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    if (description && amount) {
        const entry = { id: Date.now(), description, amount, type };
        entries.push(entry);
        saveEntries();
        resetForm();
        displayEntries();
        updateFinancialOverview();
    } else {
        alert("Please fill in both description and amount.");
    }
}

function displayEntries() {
    const entriesList = document.getElementById("entries-list");
    entriesList.innerHTML = "";
    const filter = document.querySelector('input[name="filter"]:checked').value;

    entries
        .filter((entry) => filter === "all" || entry.type === filter)
        .forEach((entry) => {
            const entryItem = document.createElement("li");
            entryItem.classList.add("entry");
            entryItem.innerHTML = `
        <span>${entry.description} - $${entry.amount.toFixed(2)} (${entry.type})</span>
        <button onclick="deleteEntry(${entry.id})">Delete</button>
      `;
            entriesList.appendChild(entryItem);
        });
}

function deleteEntry(id) {
    entries = entries.filter((entry) => entry.id !== id);
    saveEntries();
    displayEntries();
    updateFinancialOverview();
}

function updateFinancialOverview() {
    const totalIncome = entries
        .filter((entry) => entry.type === "income")
        .reduce((acc, entry) => acc + entry.amount, 0);
    const totalExpenses = entries
        .filter((entry) => entry.type === "expense")
        .reduce((acc, entry) => acc + entry.amount, 0);
    const netBalance = totalIncome - totalExpenses;

    document.getElementById("total-income").innerText = `$${totalIncome.toFixed(2)}`;
    document.getElementById("total-expenses").innerText = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("net-balance").innerText = `$${netBalance.toFixed(2)}`;
}

function resetForm() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").value = "income";
}

function filterEntries() {
    displayEntries();
}

function saveEntries() {
    localStorage.setItem("entries", JSON.stringify(entries));
}
