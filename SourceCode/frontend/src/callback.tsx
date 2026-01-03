import { useEffect, useRef } from "react";
import { trackEvent } from "./utils/analystics";
import "./styles/callback.css";
const Callback = () => {
    const called = useRef(false);

    useEffect(() => {
        if (called.current) return;
        called.current = true;

        const code = new URLSearchParams(window.location.search).get("code");
        if (!code) return;

        fetch("/api/auth/openid", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code }),
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem("token", data.token);
                trackEvent("Auth", "Login Success");
                window.location.href = "/dashboard";
            });
    }, []);

    return <div className="callback-page">
        <div className="callback-card">
            <div className="spinner"></div>
            <h2>Logging you in</h2>
            <p>Please wait while we complete the authentication...</p>
        </div>
    </div>;
};

export default Callback;