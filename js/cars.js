const mockReviews = {
    default: ["Amazing vehicle!", "Very comfortable.", "The design is very human."]
};

const Popup = document.getElementById("reviewPopup");
const reviewTitle = document.getElementById("reviewTitle");
const reviewbody = document.getElementById("reviewbody");
const reviewclose = document.querySelector(".reviewclose");
const reviewLinks = document.querySelectorAll(".disable-linkcars");

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

reviewclose.onclick = () => Popup.style.display = "none";
window.onclick = (event) => { if (event.target == Popup) Popup.style.display = "none"; }