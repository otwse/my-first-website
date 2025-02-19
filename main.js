

function showMessage() {
    alert("Hello! You launched your local website successfully.");
}

function calculateSum() {
    let a = parseFloat(document.getElementById("num1").value);
    let b = parseFloat(document.getElementById("num2").value);
    let sum = a + b;
    document.getElementById("sumResult").innerText = "Sum: " + sum;
}

async function fetchScheduledMatches() {
    try {
        const response = await fetch("http://localhost:3000/matches");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        console.log("Fetched Matches:", data);
        displayMatches(data.matches); // Make sure API response contains a "matches" array
    } catch (error) {
        console.error("Error fetching scheduled matches:", error);
    }
}

function displayMatches(matches) {
    const matchesList = document.getElementById("matches-list");
    matchesList.innerHTML = ""; // Clear previous data

    if (!matches || matches.length === 0) {
        matchesList.innerHTML = "<li>No scheduled matches found.</li>";
        return;
    }

    matches.forEach(match => {
        const matchDate = new Date(match.utcDate).toLocaleString();
        const homeTeam = match.homeTeam?.name || "Unknown";
        const awayTeam = match.awayTeam?.name || "Unknown";
        const competition = match.competition?.name || "Unknown League";
        const matchday = match.matchday || "N/A";

        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${matchDate}</strong>: ${homeTeam} vs ${awayTeam} (${competition}, Matchday ${matchday})`;

        matchesList.appendChild(listItem);
    });
}

function fetchMatchesByTeam() {
    const teamId = document.getElementById("team-id").value; // Get user input

    if (!teamId) {
        alert("Please enter a Team ID"); // Show error if empty
        return;
    }

    fetch(`http://localhost:3000/matches/${teamId}`) // Call backend with Team ID
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("Fetched Matches:", data);
            displayMatches(data.matches); // Display matches on the page
        })
        .catch(error => console.error("Error fetching matches:", error));
}




