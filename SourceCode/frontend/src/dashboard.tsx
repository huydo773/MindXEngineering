import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/dashboard.css";

const Dashboard: React.FC = () => {
    const [token, setToken] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (!t) {
            navigate("/", { replace: true });
        } else {
            setToken(t);
        }
    }, [navigate]);

    if (!token) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-card">
                <h1>Dashboard</h1>

                <p className="dashboard-subtitle">
                    Logged in successfully 🎉
                </p>

                <div className="token-box">
                    <p className="token-title">Access Token</p>
                    <pre>{token}</pre>
                </div>

                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/", { replace: true });
                    }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;