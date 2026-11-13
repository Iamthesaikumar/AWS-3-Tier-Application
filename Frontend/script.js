```javascript
document.getElementById("quoteForm").addEventListener("submit", async function (event) {

    event.preventDefault();

    const quoteData = {
        customerName: document.getElementById("customerName").value,
        phone: document.getElementById("phone").value,
        service: document.getElementById("service").value,
        pickup: document.getElementById("pickup").value,
        destination: document.getElementById("destination").value,
        shiftingDate: document.getElementById("shiftingDate").value
    };

    const message = document.getElementById("quoteMessage");

    message.textContent = "Submitting your quote...";

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
            message.textContent = "Quote submitted successfully!";
            document.getElementById("quoteForm").reset();
        } else {
            message.textContent = result.message || "Failed to submit quote.";
        }

    } catch (error) {
        message.textContent = "Unable to connect to backend.";
        console.error(error);
    }
});
```