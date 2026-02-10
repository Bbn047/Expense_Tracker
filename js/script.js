const transactionForm = document.getElementById("transaction-form");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");
const categoryInput = document.getElementById("category");
const amountInput = document.getElementById("amount");

const monthFilter = document.getElementById('filter-month');
const yearFilter = document.getElementById('filter-year');

const transactionTable = document.querySelector(".transaction-table tbody");
const incomeDisplay = document.querySelector(".income span");
const expenseDisplay = document.querySelector('.expense span');
const balanceDisplay = document.querySelector('.total-balance span');
const chartDisplayIncome = document.querySelector('.ch-income span');
const chartDisplayExpense = document.querySelector('.ch-expense span');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// global variable for avoid accidental removal of transaction while editing
let editingId = null;

// filter transactions
function getFilteredTransactions() {
    const selectedMonth = monthFilter.value;
    const selectedYear = yearFilter.value;

    return transactions.filter(t => {
        const date = new Date(t.date);
        const matchMonth = selectedMonth === "" || date.getMonth().toString() === selectedMonth;
        const matchYear = selectedYear === "" || date.getFullYear().toString() === selectedYear;

        return matchMonth && matchYear;
    });
}



//year selection 
function yearSelection() {
    const years = [...new Set(transactions.map(t => new Date(t.date).getFullYear()))];
    yearFilter.innerHTML = `<option value="">Year</option>`;
    years.forEach(year => {
        yearFilter.innerHTML += `<option value="${year}">${year}</option>`;
    });
}

// ===== RENDER =====
function renderTransactions() {
    transactionTable.innerHTML = "";
    getFilteredTransactions().forEach(addTransactionToDOM);
}

yearSelection();

// defualut chart show 
const today = new Date();
monthFilter.value = today.getMonth().toString();
yearFilter.value = today.getFullYear().toString();


//redner transactions initially
renderTransactions();
updateSummary();

//submit form 
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (editingId) {
        // UPDATE existing transaction
        const transaction = transactions.find(t => t.id === editingId);
        transaction.date = dateInput.value;
        transaction.description = descriptionInput.value;
        transaction.category = categoryInput.value;
        transaction.amount = parseFloat(amountInput.value);

        editingId = null; // clear editing state
    } else {
        // add new transaction
        const transaction = {
            id: Date.now(),
            date: dateInput.value,
            description: descriptionInput.value,
            category: categoryInput.value,
            amount: parseFloat(amountInput.value)
        };

        transactions.push(transaction);
    }
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    updateSummary();
    transactionForm.reset();
});



function addTransactionToDOM(transaction) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
    <td>${transaction.date}</td>
    <td>${transaction.description}</td>
    <td>${transaction.category}</td>
    <td>${transaction.amount.toFixed(2)}</td>
   <td><button class="delete-btn" data-id="${transaction.id}"><i class='bx bx-trash'></i></button></td>
   <td> <button class="edit-btn" data-id="${transaction.id}"><i class='bx bx-edit'></i></button></td>
    `;

    transactionTable.appendChild(tr);

    //delete button
    tr.querySelector('.delete-btn').addEventListener('click', () => {
        deleteTransaction(transaction.id, tr);
    });

    // EDIT button
    tr.querySelector('.edit-btn').addEventListener('click', () => {
        editTransaction(transaction.id);
    });
}


//delete transaction
function deleteTransaction(id, row) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    row.remove();
    updateSummary();
}


// edit transaction
function editTransaction(id) {
    // Find the transaction
    const transaction = transactions.find(t => t.id === id);
    if (!transaction) return;

    // Populate form
    dateInput.value = transaction.date;
    descriptionInput.value = transaction.description;
    categoryInput.value = transaction.category;
    amountInput.value = transaction.amount;

    // using diting id to avoid removal
    editingId = id;
}


//update summary

function updateSummary() {
    const filtered = getFilteredTransactions();

    let income = 0;
    let expense = 0;


    filtered.forEach(t => {
        if (t.category === "Income") income += t.amount;
        else if (t.category === "Expense") expense += t.amount;
    });
    //show the amounts in the expense an  income section 
    incomeDisplay.textContent = income.toFixed(2);
    expenseDisplay.textContent = expense.toFixed(2);
    balanceDisplay.textContent = (income - expense).toFixed(2);
    chartDisplayIncome.textContent = income.toFixed(2);
    chartDisplayExpense.textContent = expense.toFixed(2);

    updateChart(income, expense);
}



// ===== EVENT LISTENERS =====
monthFilter.addEventListener("change", () => {
    renderTransactions();
    updateSummary();
});

yearFilter.addEventListener("change", () => {
    renderTransactions();
    updateSummary();
});
