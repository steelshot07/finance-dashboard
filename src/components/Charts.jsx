import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend, CartesianGrid
} from "recharts";

const COLORS = ["#6c63ff", "#f97316", "#10b981", "#f43f5e", "#3b82f6", "#a855f7"];

function Charts({ transactions }) {
    // Build monthly trend data
    const monthlyMap = {};
    transactions.forEach(({ date, type, amount }) => {
        const month = date.slice(0, 7);
        if (!monthlyMap[month]) monthlyMap[month] = { month, income: 0, expenses: 0 };
        if (type === "income") monthlyMap[month].income += amount;
        else monthlyMap[month].expenses += amount;
    });
    const trendData = Object.values(monthlyMap).sort((a, b) => a.month.localeCompare(b.month));

    // Build category pie data
    const categoryMap = {};
    transactions
        .filter((t) => t.type === "expense")
        .forEach(({ category, amount }) => {
            categoryMap[category] = (categoryMap[category] || 0) + amount;
        });
    const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

    return (
        <div className="row g-3 g-md-4 mb-4">
            <div className="col-12 col-lg-7">
                <div className="chart-card">
                    <h5 className="chart-title">Monthly Trend</h5>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={trendData} margin={{ top: 10, right: 20, left: 20, bottom: 5 }} style={{ border: 'none' }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                            <XAxis dataKey="month" />
                            <YAxis width={60} tickFormatter={(v) => `₹${v / 1000}k`} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="expenses" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="col-12 col-lg-5">
                <div className="chart-card">
                    <h5 className="chart-title">Spending by Category</h5>
                    <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={false}
                                labelLine={false}
                            >
                                {pieData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default Charts;