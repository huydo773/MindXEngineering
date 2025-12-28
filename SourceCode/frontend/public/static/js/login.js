document.getElementById("btnLogin").addEventListener("click", () => {
    const params = new URLSearchParams({
        client_id: "mindx-onboarding",
        response_type: "code",
        scope: "openid profile email",
        redirect_uri: window.location.origin + "/callback.html"
    });

    window.location.href =
        "https://id-dev.mindx.edu.vn/auth?" +
        params.toString();
});