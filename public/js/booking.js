let selectedResourceId = null;
let selectedResourceName = null;

// Load resources and place them under categories
async function loadResources() {
    try {
        const res = await fetch("http://localhost:5000/resources/all");
        const resources = await res.json();

        document.getElementById("cat-Projector").innerHTML = "";
        document.getElementById("cat-PC").innerHTML = "";
        document.getElementById("cat-Microphone").innerHTML = "";

        resources.forEach(r => {
            let listId = `cat-${r.type}`;
            const list = document.getElementById(listId);

            if (list) {
                list.innerHTML += `
                    <li onclick="selectResource(${r.id}, '${r.name}', this)">
                        ${r.name}
                    </li>
                `;
            }
        });

    } catch (error) {
        console.error(error);
        alert("Unable to load resources.");
    }
}

// When a resource is selected
function selectResource(id, name, element) {
    selectedResourceId = id;
    selectedResourceName = name;

    // FIXED ID HERE
    document.getElementById("selectedResource").innerHTML =
        `Selected Resource: <strong>${name}</strong>`;

    document.querySelectorAll(".sublist li")
        .forEach(li => li.classList.remove("active"));

    element.classList.add("active");
}

// Expand/collapse
document.querySelectorAll(".cat-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const cat = btn.parentElement.getAttribute("data-cat");
        const list = document.getElementById(`cat-${cat}`);

        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", !expanded);
        list.hidden = expanded;
    });
});

// Book Now
async function bookResource() {
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return alert("User not logged in.");
    if (!selectedResourceId) return alert("Please select a resource.");
    if (!date) return alert("Please select a date.");
    if (!time) return alert("Please select a time.");

    try {
        const response = await fetch("http://localhost:5000/bookings/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user_id: user.id,
                resource_id: selectedResourceId,
                date,
                time
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert("Booking request submitted!");
        window.location.href = "my-bookings.html";

    } catch (err) {
        console.error(err);
        alert("Error while booking.");
    }
}

window.onload = loadResources;
