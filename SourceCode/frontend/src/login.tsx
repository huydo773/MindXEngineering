import "./styles/login.css";
import { trackEvent } from "./utils/analystics";

const Login = () => {
    const handleLogin = () => {
        trackEvent("Auth", "Login Click");

        const params = new URLSearchParams({
            client_id: "mindx-onboarding",
            response_type: "code",
            scope: "openid profile email",
            redirect_uri: "https://quanghuy-07.id.vn/auth/callback",
            state: "mindx-login"
        });


        window.location.href =
            "https://id-dev.mindx.edu.vn/auth?" + params.toString();

    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Login with MindX</h2>
                <button className="login-btn" onClick={handleLogin}>
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;