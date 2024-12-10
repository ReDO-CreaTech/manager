const darkModeBtn = document.getElementById("darkModeBtn");
const dashboard = document.querySelector(".dashboard");
const dateTimeBox = document.querySelector("#dateTime");

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
    }
});
