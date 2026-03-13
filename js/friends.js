document.addEventListener("DOMContentLoaded", function() {
    const friend = document.getElementById("friendAdd");

    document.body.addEventListener("click", async function(e) {

        if (e.target.classList.contains("addfriend")) {

            const btn = e.target;
            const friendId = btn.dataset.userid;

            try {

                const res = await fetch("/addFriend", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ friendId: friendId })
                });

                const data = await res.json();

                if (data.success) {

                    friend.classList.add("show");

                    btn.innerText = "Sent!";
                    btn.style.backgroundColor = "#2aa14e";
                    btn.disabled = true;

                    setTimeout(function() {
                        friend.classList.remove("show");

                        btn.innerText = "Add Friend";
                        btn.style.backgroundColor = "";
                        btn.disabled = false;
                    }, 5000);

                }

            } catch (err) {
                console.error("Error sending friend request:", err);
            }

        }
    });
});