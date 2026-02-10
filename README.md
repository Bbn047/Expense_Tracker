# Expense_Tracker
A responsive web application to track your income and expenses, visualize spending patterns, and manage transactions efficiently. All data is stored locally in your browser using localStorage.

# Features
Add Transactions: Record income or expenses with date, description, category, and amount.

Edit Transactions: Update existing entries directly from the transaction list.

Delete Transactions: Remove unwanted transactions easily.

Filter by Month/Year: View transactions and summaries for a specific time period.

Summary Section: Displays total income, expenses, net balance, and a visual chart.

Responsive Design: Works across desktop and mobile screens.

# Project Structure
/project-root
│
├─ index.html          # Main HTML page
├─ styles/
│   └─ index.css       # Custom styles
├─ js/
│   ├─ script.js       # Transaction logic (add/edit/delete/filter)
│   └─ graph.js        # Chart.js setup
└─ assets/
    └─ images/         # Images like profile icon


# How It Works

Transactions:
Each transaction is stored as an object in localStorage:

Editing Transactions:
Click the edit icon to populate the form, then update and save.

Deleting Transactions:
Click the trash icon to remove a transaction from the list and localStorage.

Filtering:
Use the month and year dropdowns to filter transactions for the chart and summary.

# Technologies Used

Frontend: HTML5, CSS3, JavaScript (ES6+)

Libraries: Bootstrap 5, Chart.js, Boxicons

Storage: Browser localStorage

# How to Run

Clone or download the repository.

Open index.html in a modern browser (Chrome, Firefox, Edge).

Start adding, editing, and deleting transactions.

# Future Improvements

Category-based detailed charts.

Export data to CSV/Excel.

Multi-user support with authentication.

Persistent cloud storage for transactions.

✅ Ready to use and fully functional offline.
