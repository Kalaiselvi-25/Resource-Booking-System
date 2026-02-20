// Load resources on page load
window.onload = function () {
    loadResources();
    loadSummary();
};

// ➤ Add Resource (POST API)
async function addResource() {
    const name = document.getElementById("resName").value.trim();
    const type = document.getElementById("resType").value;

    if (!name || !type) {
        alert("Please fill all fields.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/resources/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, type })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert("Resource added successfully!");

        document.getElementById("resName").value = "";
        document.getElementById("resType").value = "";

        loadResources();
        loadSummary();

    } catch (error) {
        console.error(error);
        alert("Something went wrong");
    }
}

// ➤ Get All Resources
async function loadResources() {
    try {
        const response = await fetch("http://localhost:5000/resources/all");
        const resources = await response.json();

        const tableBody = document.getElementById("resourceTable");
        tableBody.innerHTML = "";

        if (resources.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="3">No resources found.</td></tr>`;
            return;
        }

        resources.forEach(r => {
            tableBody.innerHTML += `
                <tr>
                    <td>${r.name}</td>
                    <td>${r.type}</td>
                    <td><button class="delete-btn" onclick="deleteResource(${r.id})">Delete</button></td>
                </tr>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}

// ➤ Delete Resource
async function deleteResource(id) {
    if (!confirm("Are you sure?")) return;

    try {
        const response = await fetch(`http://localhost:5000/resources/delete/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        alert(data.message);

        loadResources();
        loadSummary();

    } catch (error) {
        console.error(error);
    }
}

// ➤ Load Summary
async function loadSummary() {
    try {
        const response = await fetch("http://localhost:5000/resources/summary");
        const summary = await response.json();

        const summaryDiv = document.getElementById("resource-summary");
        summaryDiv.innerHTML = "";

        if (summary.length === 0) {
            summaryDiv.innerHTML = "<p>No resources available.</p>";
            return;
        }

        summary.forEach(item => {
            summaryDiv.innerHTML += `
                <div class="summary-card">
                    <h3>${item.type}</h3>
                    <p><b>Total:</b> ${item.total}</p>
                    <p><b>Names:</b> ${item.names.join(", ")}</p>
                </div>
            `;
        });

    } catch (error) {
        console.error(error);
    }
}
