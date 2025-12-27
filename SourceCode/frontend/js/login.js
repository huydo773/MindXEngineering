async function login(event) {
    // Ngăn chặn form submit làm tải lại trang nếu bạn dùng thẻ <form>
    if (event) event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Hiệu ứng chờ (Optional)
    const btn = document.getElementById("btnLogin");
    btn.disabled = true;
    btn.innerText = "Loginning...";

    try {
        const res = await fetch("https://webappvercel.azurewebsites.net/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (!res.ok) {
            // Thông báo lỗi cụ thể từ server nếu có
            throw new Error(data.message || "Falied to login");
        }

        // Lưu token
        localStorage.setItem("token", data.token);

        // Chuyển hướng sang dashboard
        // Dùng replace để người dùng không bấm 'Back' quay lại trang login sau khi đã login
        window.location.replace("dashboard.html");

    } catch (error) {
        console.error("Lỗi khi login:", error);
        alert(error.message);

        // Khôi phục nút bấm nếu lỗi
        btn.disabled = false;
        btn.innerText = "Login";
    }
}

document.getElementById("btnLogin").addEventListener("click", login);