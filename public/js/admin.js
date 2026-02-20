function goToPending() {
    window.location.href = "pending-bookings.html";
}

function goToResources() {
    window.location.href = "manage-resources.html";
}

function logout() {
    // Clear session values
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");

    alert("Logged out successfully!");

    // Redirect to login page
    window.location.href = "index.html";
}
