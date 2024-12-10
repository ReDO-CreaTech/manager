const darkModeBtn = document.getElementById("darkModeBtn");
const dashboard = document.querySelector(".dashboard");
const dateTimeBox = document.querySelector("#dateTime");
const clock = document.querySelector(".clock");
const date = document.querySelector(".date");

// Set initial mode (optional)
dashboard.classList.add("light-mode");
darkModeBtn.style.backgroundColor = "white";
darkModeBtn.style.color = "#00796b";

// Add event listener for toggle
darkModeBtn.addEventListener("click", () => {
    if (dashboard.classList.contains("light-mode")) {
        dashboard.classList.remove("light-mode");
        dashboard.classList.add("dark-mode");

        darkModeBtn.textContent = "Disable Dark Mode";

        // Change button styling for dark mode
        darkModeBtn.style.backgroundColor = "#00796b";
        darkModeBtn.style.color = "white";

        // Change #dateTime styling for dark mode
        dateTimeBox.style.backgroundColor = "#00796b";
        dateTimeBox.style.color = "white";

        date.style.backgroundColor = "#00796b";
        date.style.color = "white";

        clock.style.backgroundColor = "#00796b";
        clock.style.color = "white";
        clock.style.borderColor = "#00796b";
    } else {
        dashboard.classList.remove("dark-mode");
        dashboard.classList.add("light-mode");

        darkModeBtn.textContent = "Enable Dark Mode";

        // Change button styling for light mode
        darkModeBtn.style.backgroundColor = "white";
        darkModeBtn.style.color = "#00796b";

        // Revert #dateTime styling for light mode
        dateTimeBox.style.backgroundColor = "white";
        dateTimeBox.style.color = "#00796b";

        date.style.backgroundColor = "white";
        date.style.color = "#00796b";

        clock.style.backgroundColor = "white";
        clock.style.color = "#00796b";
        clock.style.borderColor = "white";
    }
});

// Clock

// Function to update the date and time
// Function to update the clock and date
function updateClock() {
    const clockElement = document.getElementById('clock');
    const dateElement = document.getElementById('date');

    // Get current time
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format time (12-hour format with leading zeros for minutes and seconds)
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // Set the time in the clock
    clockElement.textContent = formattedTime;

    // Get formatted date (e.g., "December 10, 2024")
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    const dayOfWeek = daysOfWeek[now.getDay()];

    // Set the date in the date element
    dateElement.textContent = `${dayOfWeek}, ${month} ${day}, ${year}`;
}

// Call the updateClock function immediately and set it to update every second
updateClock();
setInterval(updateClock, 1000);

