async function login(event) {
    if (event) event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const btn = document.getElementById("btnLogin");
    btn.disabled = true;
    btn.innerText = "Logging in...";

    try {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Failed to login");
        }
        localStorage.setItem("token", data.token);

        window.top.location.href = "/dashboard.html";

    } catch (error) {
        console.error("Login error:", error);
        alert(error.message);

        btn.disabled = false;
        btn.innerText = "Login";
    }
}

document
    .getElementById("btnLogin")
    .addEventListener("click", login);