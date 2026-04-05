export function exportToCSV(transactions) {
    const headers = ["ID", "Date", "Description", "Cateegory", "Type", "Amount"];
    const rows = transactions.map((t) => [t.id, t.date, t.description, t.category, t.type, t.amount]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}