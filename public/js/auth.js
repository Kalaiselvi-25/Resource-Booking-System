// ✅ LOGIN FUNCTION
async function login() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        // ✅ Save user session in ONE object
        localStorage.setItem("user", JSON.stringify({
            id: data.id,
            name: data.name,
            role: data.role
        }));

        // Redirect
        if (data.role === "admin") {
            window.location.href = "admin-dashboard.html";
        } else {
            window.location.href = "student-dashboard.html";
        }

    } catch (error) {
        console.error(error);
        alert("Something went wrong. Try again.");
    }
}


// ✅ REGISTER FUNCTION
async function register() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert("Registration successful ✅ Please login.");
        window.location.href = "index.html";

    } catch (error) {
        console.error(error);
        alert("Something went wrong. Try again.");
    }
}
