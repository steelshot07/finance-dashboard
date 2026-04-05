import { useState } from "react";
import { exportToCSV } from "../utils/exportCSV";

const categories = ["All", "Income", "Housing", "Food", "Entertainment", "Utilities", "Health", "Shopping"];

function TransactionsTable({
    transactions, role, search, setSearch,
    filterCategory, setFilterCategory, filterType, setFilterType, addTransaction
}) {
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ date: "", description: "", amount: "", category: "Food", type: "expense" });

    const filtered = transactions.filter((t) => {
        const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCategory === "All" || t.category === filterCategory;
        const matchType = filterType === "All" || t.type === filterType;
        return matchSearch && matchCat && matchType;
    });

    const handleAdd = () => {
        if (!form.date || !form.description || !form.amount) return;
        addTransaction({ ...form, amount: parseFloat(form.amount) });
        setForm({ date: "", description: "", amount: "", category: "Food", type: "expense" });
        setShowForm(false);
    };

    return (
        <div className="table-card mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                <h5 className="chart-title mb-0">Transactions</h5>
                {role === "admin" && (
                    <button className="btn btn-primary btn-sm" onClick={() => setShowForm(!showForm)}>
                        {showForm ? "Cancel" : "+ Add Transaction"}
                    </button>

                )}
                <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => exportToCSV(transactions)}
                >
                    Export CSV
                </button>
            </div>

            {/* Admin Add Form */}
            {showForm && role === "admin" && (
                <div className="add-form mb-3 p-3">
                    <div className="row g-2">
                        <div className="col-6 col-md-2">
                            <input type="date" className="form-control" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
                        </div>
                        <div className="col-6 col-md-3">
                            <input type="text" className="form-control" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div className="col-6 col-md-2">
                            <input type="number" className="form-control" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
                        </div>
                        <div className="col-6 col-md-2">
                            <select className="form-select" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                                {["Food", "Housing", "Utilities", "Health", "Shopping", "Entertainment", "Income"].map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="col-6 col-md-2">
                            <select className="form-select" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <div className="col-6 col-md-1">
                            <button className="btn btn-success w-100" onClick={handleAdd}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="row g-2 mb-3">
                <div className="col-12 col-md-5">
                    <input type="text" className="form-control" placeholder="Search transactions..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div className="col-6 col-md-3">
                    <select className="form-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                        {categories.map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <div className="col-6 col-md-2">
                    <select className="form-select" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                        <option value="All">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            {filtered.length === 0 ? (
                <div className="empty-state">No transactions found.</div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th className="text-end">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((t) => (
                                <tr key={t.id}>
                                    <td>{t.date}</td>
                                    <td>{t.description}</td>
                                    <td><span className="category-pill">{t.category}</span></td>
                                    <td>
                                        <span className={`type-badge ${t.type === "income" ? "type-income" : "type-expense"}`}>
                                            {t.type}
                                        </span>
                                    </td>
                                    <td className={`text-end fw-semibold ${t.type === "income" ? "text-success" : "text-danger"}`}>
                                        {t.type === "income" ? "+" : "-"}₹{t.amount.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TransactionsTable;