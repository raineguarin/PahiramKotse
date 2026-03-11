const mockReviews = {
    default: ["Amazing vehicle!", "Very comfortable.", "The design is very human."]
};

const Popup = document.getElementById("reviewPopup");
const reviewTitle = document.getElementById("reviewTitle");
const reviewbody = document.getElementById("reviewbody");
const reviewclose = document.querySelector(".reviewclose");
const reviewLinks = document.querySelectorAll(".disable-linkcars");
const reservePopup = document.getElementById("reservePopup");
const reserveClose = document.querySelector(".reserveclose");

reviewLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        
        const carId = this.getAttribute("data-car");
        const carName = this.getAttribute("data-name");

        reviewTitle.innerText = `${carName} Reviews`;
        reviewbody.innerHTML = ""; 
        
        mockReviews.default.forEach(rev => {
            const p = document.createElement("p");
            p.innerText = `“${rev}”`;
            reviewbody.appendChild(p);
        });

        Popup.style.display = "block";
    });
});

function openReserveModal(carId, carName) {
    document.getElementById("reserveCarId").value = carId;
    document.getElementById("displayCarName").innerText = carName;
    reservePopup.style.display = "block";
}

if (reserveClose) {
    reserveClose.onclick = () => reservePopup.style.display = "none";
}


//time helper
reviewclose.onclick = () => Popup.style.display = "none";
window.onclick = (event) => { if (event.target == Popup) Popup.style.display = "none"; }

function formatTime12h(timeStr) {
    let [hours, minutes] = timeStr.split(':');
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
}

//reserve popup form
const reserveForm = document.getElementById("reserveForm");

reserveForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const startRaw = document.getElementById("startTime").value;
    const endRaw = document.getElementById("endTime").value;

    const formattedTimeRange = `${formatTime12h(startRaw)} - ${formatTime12h(endRaw)}`;

    const reservationData = {
        carId: document.getElementById("reserveCarId").value,
        date: document.getElementById("reserveDate").value,
        time: formattedTimeRange 
    };

    try {
        const response = await fetch('/reservation', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationData)
        });

        if (response.ok) {
            alert("Reservation submitted successfully!");
            window.location.href = "/reservations"; 
        } else {
            const err = await response.json();
            alert("Error: " + err.error);
        }
    } catch (error) {
        console.error("Submission error:", error);
        alert("Could not connect to the server.");
    }
});


