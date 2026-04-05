#  FinTrack — Finance Dashboard

A clean, interactive personal finance dashboard built with React. Track income, expenses, and spending patterns with role-based access, dark mode, and data persistence.

## 🔗 Live Demo
[View Live](https://steelshot07.github.io/finance-dashboard)

---

##  Features

- **Dashboard Overview** — Summary cards for Total Balance, Income, and Expenses
- **Charts** — Monthly trend (Line chart) and Spending by Category (Pie chart)
- **Transactions Table** — Searchable, filterable, paginated transaction list
- **Role-Based UI** — Viewer (read-only) and Admin (add transactions) modes
- **Insights Section** — Top spending category, monthly comparison, quick tips
- **Dark Mode** — Toggle between light and dark themes
- **CSV Export** — Download all transactions as a `.csv` file
- **Data Persistence** — State saved to localStorage, survives page refresh
- **Fully Responsive** — Works on mobile, tablet, and desktop

---

##  Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool & dev server |
| Bootstrap 5 | Grid system & responsive layout |
| Recharts | Data visualization |
| localStorage | Client-side persistence |
| Plain CSS | Custom styling & dark mode |

---

##  Project Structure
src/
├── components/
│   ├── Header.jsx          # Navigation, role switcher, dark mode toggle
│   ├── SummaryCards.jsx    # Balance, income, expense cards
│   ├── Charts.jsx          # Line chart and pie chart
│   ├── TransactionsTable.jsx  # Table with search, filter, pagination
│   └── InsightsSection.jsx # Derived insights from transaction data
├── data/
│   └── mockData.js         # Static mock transaction data
├── utils/
│   └── exportCSV.js        # CSV export utility
├── styles/
│   └── dashboard.css       # All custom styles including dark mode
├── App.jsx                 # Root component, global state management
└── main.jsx                # Entry point

##  Getting Started

### Prerequisites
- Node.js (v16 or above)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/finance-dashboard.git
```

2. Navigate into the project
```bash
cd finance-dashboard
```

3. Install dependencies
```bash
npm install
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

---

##  Role-Based Access

Switch roles using the dropdown in the top-right corner:

| Role | Permissions |
|---|---|
| Viewer | View dashboard, charts, transactions, insights |
| Admin | Everything above + add new transactions |

> Note: This is a frontend-only simulation. No backend authentication is implemented.

---

## 💾 Data Persistence

The following are saved to localStorage and restored on page refresh:

- All transactions (including ones added as Admin)
- Selected role
- Dark mode preference

---

##  State Management

State is managed using React's built-in `useState` and `useEffect` hooks. Global state lives in `App.jsx` and is passed to child components via props. No external state management library is used — the app's scale does not require one.

---

## CSV Export

Click the ** Export CSV** button in the Transactions section to download all current transactions as a `.csv` file compatible with Excel and Google Sheets.

---

##  Dark Mode

Click the ** Dark** button in the header to toggle dark mode. Your preference is saved and restored on refresh.

---

##  Assumptions

- All data is static and mock — no real financial data is used
- Role switching is for demo purposes only — not secure
- Currency is displayed in Indian Rupees (₹)
- Amounts in mock data are sample figures for demonstration

---



