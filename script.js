let trips = JSON.parse(localStorage.getItem("trips")) || [];

function addTrip() {

    const destination = document.getElementById("destination").value;
    const date = document.getElementById("date").value;
    const activity = document.getElementById("activity").value;
    const travelDetails = document.getElementById("travelDetails").value;
    const notes = document.getElementById("notes").value;

    if (destination === "" || date === "" || activity === "") {
        alert("Please enter destination, date and activity.");
        return;
    }

    const trip = {
        id: Date.now(),
        destination: destination,
        date: date,
        activity: activity,
        travelDetails: travelDetails,
        notes: notes
    };

    trips.push(trip);

    saveTrips();
    displayTrips();
    clearForm();
}

function displayTrips() {

    const tripList = document.getElementById("tripList");

    tripList.innerHTML = "";

    if (trips.length === 0) {
        tripList.innerHTML = "<p>No travel plans added yet.</p>";
        return;
    }

    trips.forEach(function(trip) {

        const card = document.createElement("div");
        card.className = "trip-card";

        card.innerHTML = `
            <h3>📍 ${trip.destination}</h3>
            <p><strong>📅 Date:</strong> ${trip.date}</p>
            <p><strong>🎯 Activity:</strong> ${trip.activity}</p>
            <p><strong>🚆 Travel:</strong> ${trip.travelDetails}</p>
            <p><strong>📝 Notes:</strong> ${trip.notes}</p>

            <button class="edit-btn" onclick="editTrip(${trip.id})">
                Edit
            </button>

            <button class="delete-btn" onclick="deleteTrip(${trip.id})">
                Delete
            </button>
        `;

        tripList.appendChild(card);
    });
}

function deleteTrip(id) {

    trips = trips.filter(function(trip) {
        return trip.id !== id;
    });

    saveTrips();
    displayTrips();
}

function editTrip(id) {

    const trip = trips.find(function(trip) {
        return trip.id === id;
    });

    document.getElementById("destination").value = trip.destination;
    document.getElementById("date").value = trip.date;
    document.getElementById("activity").value = trip.activity;
    document.getElementById("travelDetails").value = trip.travelDetails;
    document.getElementById("notes").value = trip.notes;

    deleteTrip(id);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function clearForm() {

    document.getElementById("destination").value = "";
    document.getElementById("date").value = "";
    document.getElementById("activity").value = "";
    document.getElementById("travelDetails").value = "";
    document.getElementById("notes").value = "";
}

function saveTrips() {
    localStorage.setItem("trips", JSON.stringify(trips));
}

displayTrips();
