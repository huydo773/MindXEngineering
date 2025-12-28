async function loadUser() {
    const token = localStorage.getItem("token");
    console.log("Token from localStorage:", token);

    if (!token) {
        window.top.location.href = "/";
        return;
    }

    const res = await fetch("/api/dashboard", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (res.status === 401) {
        alert("Session expired, please login again");
        localStorage.removeItem("token");
        window.top.location.href = "/";
        return;
    }

    const data = await res.json();

    document.getElementById("userInfo").innerHTML = `
        <p>Username: ${data.user.username}</p>
    `;
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    alert("Logged out");
    window.top.location.href = "/";
});

loadUser();