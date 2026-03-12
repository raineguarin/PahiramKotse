document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("vehicleGrid");
    const searchInput = document.getElementById("searchInput");
    const filterType = document.getElementById("filterType");
    const filterStatus = document.getElementById("filterStatus");
    
    const addBtn = document.getElementById("addBtn");
    const editBtn = document.getElementById("editBtn");
    const deleteBtn = document.getElementById("deleteBtn");

    const vehicleFormModal = document.getElementById("vehicleFormModal");
    const deleteModal = document.getElementById("manageconf");
    const vehicleForm = document.getElementById("vehicleForm");

    let selectedVehicle = null;


    grid.addEventListener("click", (e) => {
        const card = e.target.closest(".vehicle-card");
        if (!card) return;

        document.querySelectorAll(".vehicle-card").forEach(c => c.classList.remove("selected"));
        card.classList.add("selected");

        selectedVehicle = {
            id: card.dataset.id,
            brand: card.dataset.brand,
            model: card.dataset.model,
            type: card.dataset.type,
            rate: card.dataset.rate,
            status: card.dataset.status,
            capacity: card.dataset.capacity,
 
            image: card.querySelector('img').getAttribute('src') 
        };

        editBtn.disabled = false;
        deleteBtn.disabled = false;
    });


    function applyFilters() {
        const search = searchInput.value.toLowerCase();
        const typeVal = filterType.value;
        const statusVal = filterStatus.value;

        document.querySelectorAll(".vehicle-card").forEach(card => {
            const brand = (card.dataset.brand || "").toLowerCase();
            const model = (card.dataset.model || "").toLowerCase();
            const type = card.dataset.type;
            const status = card.dataset.status;

            const matchesSearch = brand.includes(search) || model.includes(search);
            const matchesType = (typeVal === "all") || (type === typeVal);
            const matchesStatus = (statusVal === "all") || (status === statusVal);

            card.style.display = (matchesSearch && matchesType && matchesStatus) ? "grid" : "none";
        });
    }

    searchInput.addEventListener("input", applyFilters);
    filterType.addEventListener("change", applyFilters);
    filterStatus.addEventListener("change", applyFilters);

    addBtn.onclick = () => {
        document.getElementById("formModalTitle").innerText = "Add New Vehicle";
        vehicleForm.reset();
        document.getElementById("formVehicleId").value = "";

        document.getElementById("formImageURL").value = "/images/default.png"; 
        vehicleFormModal.style.display = "block";
    };

    editBtn.onclick = () => {
        if (!selectedVehicle) return;
        document.getElementById("formModalTitle").innerText = "Edit Vehicle";
        document.getElementById("formVehicleId").value = selectedVehicle.id;
        document.getElementById("formBrand").value = selectedVehicle.brand;
        document.getElementById("formModel").value = selectedVehicle.model;
        document.getElementById("formType").value = selectedVehicle.type;
        document.getElementById("formCapacity").value = selectedVehicle.capacity;
        document.getElementById("formRate").value = selectedVehicle.rate;
        document.getElementById("formStatus").value = selectedVehicle.status;

        document.getElementById("formImageURL").value = selectedVehicle.image; 
        vehicleFormModal.style.display = "block";
    };

    vehicleForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append("id", document.getElementById("formVehicleId").value);
        formData.append("brand", document.getElementById("formBrand").value);
        formData.append("model", document.getElementById("formModel").value);
        formData.append("carType", document.getElementById("formType").value);
        formData.append("capacity", document.getElementById("formCapacity").value);
        formData.append("dailyRate", document.getElementById("formRate").value);
        formData.append("status", document.getElementById("formStatus").value === "true");

        const imageFile = document.getElementById("formImageFile").files[0];
        if (imageFile) {
            formData.append("vehicleImage", imageFile);
        } else {
  
            formData.append("existingImage", document.getElementById("formImageURL").value);
        }

        try {
            const response = await fetch('/save-vehicle', {
                method: 'POST',
                body: formData 
            });

            if (response.ok) window.location.reload();
            else alert("Error saving vehicle.");
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

    deleteBtn.onclick = () => {
        if (!selectedVehicle) return;
        document.getElementById("deleteTargetName").innerText = `${selectedVehicle.brand} ${selectedVehicle.model}`;
        deleteModal.style.display = "block";
    };

    document.getElementById("deleteConfirmBtn").addEventListener("click", async () => {
        if (!selectedVehicle) return;
        try {
            const response = await fetch('/delete-vehicle', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: selectedVehicle.id })
            });
            if (response.ok) window.location.reload();
            else alert("Error deleting vehicle.");
        } catch (error) {
            console.error("Fetch error:", error);
        }
    });

    document.getElementById("formCancelBtn").onclick = () => vehicleFormModal.style.display = "none";
    document.getElementById("deleteCancelBtn").onclick = () => deleteModal.style.display = "none";

    window.onclick = (event) => {
        if (event.target == vehicleFormModal) vehicleFormModal.style.display = "none";
        if (event.target == deleteModal) deleteModal.style.display = "none";
    };
});