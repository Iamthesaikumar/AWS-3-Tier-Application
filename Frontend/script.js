document.getElementById("quoteForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const message = document.getElementById("quoteMessage");

    message.innerHTML = "Submitting your quote...";

    const quoteData = {
        customerName: document.getElementById("customerName").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        pickup: document.getElementById("pickup").value,
        destination: document.getElementById("destination").value,
        shiftingDate: document.getElementById("shiftingDate").value
    };

    try {

        const response = await fetch("/api/quotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(quoteData)
        });

        const result = await response.json();

        if (response.ok) {

            message.innerHTML =
                `<div class="alert alert-success">
                    Quote submitted successfully! Quote ID: ${result.quoteId}
                </div>`;

            document.getElementById("quoteForm").reset();

        } else {

            message.innerHTML =
                `<div class="alert alert-danger">${result.message}</div>`;

        }

    } catch (error) {

        message.innerHTML =
            `<div class="alert alert-danger">
                Unable to submit quote. Please try again.
            </div>`;

        console.error(error);

    }

});
