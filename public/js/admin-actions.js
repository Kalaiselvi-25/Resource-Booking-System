// Load pending bookings on page load
window.onload = loadPending;

async function loadPending() {
    try {
        const response = await fetch("http://localhost:5000/bookings/pending");
        const bookings = await response.json();

        const table = document.getElementById("pendingTable");
        table.innerHTML = "";

        if (bookings.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center;">No pending bookings.</td>
                </tr>
            `;
            return;
        }

        bookings.forEach(b => {
            table.innerHTML += `
                <tr>
                    <td>${b.student}</td>
                    <td>${b.resource}</td>
                    <td>${b.date}</td>
                    <td>${b.time}</td>
                    <td>
                        <button class="approve-btn" onclick="updateStatus(${b.id}, 'approved')">Approve</button>
                        <button class="deny-btn" onclick="updateStatus(${b.id}, 'rejected')">Deny</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error loading pending bookings:", err);
        alert("Could not load pending bookings.");
    }
}

async function updateStatus(id, status) {
    try {
        const response = await fetch(`http://localhost:5000/bookings/update/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status })
        });

        const data = await response.json();
        alert(data.message);

        loadPending(); // Refresh table

    } catch (err) {
        console.error("Error updating status:", err);
        alert("Unable to update booking status.");
    }
}
