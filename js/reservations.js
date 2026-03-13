const reviewPopup = document.getElementById("reviewPopup");
const reviewClose = document.querySelector(".reviewclose");
const reviewForm = document.getElementById("reviewForm");

function openReviewModal(vehicleId, vehicleName, reservationId) {
    document.getElementById("reviewVehicleId").value = vehicleId;
    document.getElementById("reviewReservationId").value = reservationId;

    document.getElementById("reviewVehicleTitle").innerText = `Review: ${vehicleName}`;

    reviewPopup.style.display = "flex";
}

if (reviewClose) {
    reviewClose.onclick = () => reviewPopup.style.display = "none";
}

window.onclick = (event) => {
    if (event.target == reviewPopup) {
        reviewPopup.style.display = "none";
    }
};



reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const vehicleId = document.getElementById("reviewVehicleId").value;
    const reservationId = document.getElementById("reviewReservationId").value;

    const reviewData = {
        vehicleId,
        reservationId,
        title: document.getElementById("reviewTitleInput").value,
        description: document.getElementById("reviewDescriptionInput").value
    };

    try {
        const response = await fetch('/submit-review', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reviewData)
        });

        if (response.ok) {

            alert("Review submitted!");

            reviewPopup.style.display = "none";

            reviewForm.reset();

            const btn = document.getElementById(`review-btn-${reservationId}`);

            if (btn) {
                btn.innerText = "✔ Review Submitted";
                btn.disabled = true;
                btn.style.backgroundColor = "#4CAF50";
                btn.style.cursor = "not-allowed";
            }

        } else {
            const err = await response.json();
            alert(err.error);
        }

    } catch (error) {
        console.error(error);
        alert("Could not submit review.");
    }
});