async function loadUser() {
    const token = localStorage.getItem("token");
    console.log("Token từ localStorage:", token);

    if (!token) {
        window.location.href = "index.html";
        return;
    }

    const res = await fetch("https://webappvercel.azurewebsites.net/api/dashboard", {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    if (res.status === 401) {
        alert("Session expired, please login again");
        localStorage.removeItem("token");
        window.location.href = "index.html";
        return;
    }

    const data = await res.json();

    document.getElementById("userInfo").innerHTML = `
        <p>Username: ${data.user.username}</p>
    `;
}

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem("token");
    alert("Logged out");
    window.location.href = "index.html";
});

loadUser();