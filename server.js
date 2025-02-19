require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow frontend access

const API_KEY = process.env.API_KEY;

app.get("/matches/:teamId", async (req, res) => {
    const teamId = req.params.teamId; // Get Team ID from URL

    const API_URL = `https://api.football-data.org/v4/teams/${teamId}/matches?status=SCHEDULED`;

    try {
        const response = await fetch(API_URL, {
            headers: { "X-Auth-Token": API_KEY }
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        res.json(data); // Send data back to frontend
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

