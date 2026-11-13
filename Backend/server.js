const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Jumavolley@03",
    database: "saipackers"
});

// Health check API
app.get("/api/health", (req, res) => {
    res.json({
        status: "healthy",
        service: "Sai Packers Backend"
    });
});

// Submit quote API
app.post("/api/quotes", async (req, res) => {
    try {
        const {
            customerName,
            phone,
            service,
            pickup,
            destination,
            shiftingDate
        } = req.body;

        if (!customerName || !phone || !service ||
            !pickup || !destination || !shiftingDate) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const sql = `
            INSERT INTO quotes
            (customer_name, phone, service, pickup, destination, shifting_date)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.execute(sql, [
            customerName,
            phone,
            service,
            pickup,
            destination,
            shiftingDate
        ]);

        res.status(201).json({
            message: "Quote submitted successfully",
            quoteId: result.insertId
        });

    } catch (error) {
        console.error("Database error:", error);

        res.status(500).json({
            message: "Failed to submit quote"
        });
    }
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend running on port ${PORT}`);
});