// Load bookings when page opens
window.onload = loadMyBookings;

async function loadMyBookings() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.id) {
        alert("User not logged in!");
        return window.location.href = "index.html";
    }

    const userId = user.id;

    try {
        const response = await fetch(`http://localhost:5000/bookings/my/${userId}`);
        const bookings = await response.json();

        const table = document.getElementById("myBookingsTable");
        table.innerHTML = ""; 

        if (bookings.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="4" style="text-align:center;">No bookings found.</td>
                </tr>
            `;
            return;
        }

        bookings.forEach(b => {
            table.innerHTML += `
                <tr>
                    <td>${b.resource}</td>
                    <td>${b.date}</td>
                    <td>${b.time}</td>
                    <td class="status-${b.status}">${b.status.toUpperCase()}</td>
                </tr>
            `;
        });

    } catch (err) {
        console.error(err);
        alert("Unable to load bookings.");
    }
}
