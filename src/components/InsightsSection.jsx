import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faCalendarDays, faLightbulb } from "@fortawesome/free-solid-svg-icons";

function InsightsSection({ transactions }) {
    const expenses = transactions.filter((t) => t.type === "expense");

    // Highest spending category
    const categoryMap = {};
    expenses.forEach(({ category, amount }) => {
        categoryMap[category] = (categoryMap[category] || 0) + amount;
    });
    const topCategory = Object.entries(categoryMap).sort((a, b) => b[1] - a[1])[0];

    // Monthly comparison
    const monthlyMap = {};
    expenses.forEach(({ date, amount }) => {
        const month = date.slice(0, 7);
        monthlyMap[month] = (monthlyMap[month] || 0) + amount;
    });
    const months = Object.entries(monthlyMap).sort((a, b) => a[0].localeCompare(b[0]));
    const lastTwo = months.slice(-2);

    const insights = [
        {
            icon: faChartBar,
            title: "Top Spending Category",
            text: topCategory ? `${topCategory[0]} — ₹${topCategory[1].toLocaleString()}` : "No data",
        },
        {
            icon: faCalendarDays,
            title: "Monthly Comparison",
            text: lastTwo.length === 2
                ? `${lastTwo[1][0]}: ₹${lastTwo[1][1]} vs ${lastTwo[0][0]}: ₹${lastTwo[0][1]}`
                : "Not enough data",
        },
        {
            icon: faLightbulb,
            title: "Quick Insight",
            text: topCategory
                ? `You spend the most on ${topCategory[0]}. Consider reviewing this category.`
                : "Add more transactions for insights.",
        },
    ];

    return (
        <div className="mb-4">
            <h5 className="chart-title mb-3">Insights</h5>
            <div className="row g-3">
                {insights.map((ins) => (
                    <div className="col-12 col-md-4" key={ins.title}>
                        <div className="insight-card">
                            <span className="insight-icon-wrapper">
                                <FontAwesomeIcon icon={ins.icon} />
                            </span>
                            <div>
                                <p className="insight-label">{ins.title}</p>
                                <p className="insight-value">{ins.text}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InsightsSection;