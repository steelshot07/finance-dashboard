import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faArrowTrendUp, faArrowTrendDown } from "@fortawesome/free-solid-svg-icons";

function SummaryCards({ transactions }) {
    const income = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const expenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expenses;

    const cards = [
        { label: "Total Balance", value: balance, color: "card-balance", icon: faWallet },
        { label: "Total Income", value: income, color: "card-income", icon: faArrowTrendUp },
        { label: "Total Expenses", value: expenses, color: "card-expense", icon: faArrowTrendDown },
    ];

    return (
        <div className="row g-3 g-md-4 mb-4">
            {cards.map((card) => (
                <div className="col-12 col-md-4" key={card.label}>
                    <div className={`summary-card ${card.color}`}>
                        <div className="card-icon-wrapper">
                            <FontAwesomeIcon icon={card.icon} />
                        </div>
                        <div>
                            <p className="card-label">{card.label}</p>
                            <h2 className="card-value">
                                ₹{Math.abs(card.value).toLocaleString()}
                            </h2>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SummaryCards;