const form = document.getElementById("transaction-form");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const transactionList = document.getElementById("transaction-list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("total-income");
const expenseEl = document.getElementById("total-expense");
const themeToggle = document.getElementById("theme-toggle");

let transactions = [];

form.addEventListener("submit", function(element) {
    element.preventDefault();

    const transaction = {
        id: Date.now(),                    // unique id — we'll use it for delete later
        description: description.value,
        amount: Number(amount.value), // convert string → number
        type: typeSelect.value
    };

    transactions.push(transaction);
    saveTransactions();
    renderTransactions();   // a function you'll write next
    updateSummary();
    form.reset();           // clears the inputs after submit
    
});

function renderTransactions() {
    transactionList.innerHTML = "";   // clear first, so we don't duplicate rows
    transactions.forEach(function(t) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${t.description}</td>
            <td>${t.type}</td>
            <td>₦${t.amount.toLocaleString()}</td>
            <td><button class="delete-btn" data-id="${t.id}">Delete</button></td>
        `;
        transactionList.appendChild(row);
    });
}

transactionList.addEventListener("click", function(e){
    if(e.target.classList.contains("delete-btn")){
        const id = Number(e.target.dataset.id);
        transactions = transactions.filter(function(t){
            return t.id !== id;
        });
        saveTransactions();
        renderTransactions();
        updateSummary();
    }
})

function updateSummary() {
    let income = 0;
    let expense = 0;

    transactions.forEach(function(t) {
        if (t.type === "income") {
            income += t.amount;
        } else {
            expense += t.amount;
        }
    });

    const balance = income - expense;

    balanceEl.textContent = balance.toLocaleString();
    incomeEl.textContent = income.toLocaleString();
    expenseEl.textContent = expense.toLocaleString();
}

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadTransactions() {
    const saved = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions = saved;
    renderTransactions();
    updateSummary();
}

loadTransactions();

