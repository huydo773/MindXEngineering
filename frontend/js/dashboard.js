async function loadUser() {
    const res = await fetch("http://localhost:3000/api/dashboard", {
        method: "GET",
        credentials: "include"
    });

    const data = await res.json();
    document.getElementById("userInfo").innerHTML = `
          <p>Username: ${data.user.username}</p>
    `;
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include'
    });
    alert("Logged out");
    window.location.href = 'login.html';
});

loadUser();