import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

function Header({ role, setRole, darkMode, setDarkMode }) {
    return (
        <header className="dashboard-header">
            <div className="d-flex align-items-center flex-wrap gap-2">
                <span className="header-icon"></span>
                <h1 className="header-title">FinanceTracker</h1>
            </div>
            <div className="d-flex align-items-center flex-wrap gap-2 gap-md-3">
                <button
                    className="btn btn-sm dark-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    <FontAwesomeIcon icon={darkMode ? faSun : faMoon} style={{ marginRight: "6px" }} />
                    {darkMode ? "Light" : "Dark"}
                </button>
                <span className="role-badge">
                    {role === "admin" ? "Admin" : "Viewer"}
                </span>
                <select
                    className="form-select role-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="viewer">Viewer</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
        </header>
    );
}

export default Header;