const code = new URLSearchParams(window.location.search).get("code");

fetch("/api/auth/openid", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code })
})
    .then(res => res.json())
    .then(data => {
        localStorage.setItem("token", data.token);
        window.location.replace("/dashboard.html");
    })
    .catch(err => {
        alert("Login failed");
        console.error(err);
    });