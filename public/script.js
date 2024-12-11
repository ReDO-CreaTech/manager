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

// staffDevelopment Graph

window.onload = function() {
    const bars = document.querySelectorAll('.bar');
    
    setInterval(() => {
        bars.forEach(bar => {
            const randomHeight = Math.floor(Math.random() * 101);  // Random height between 0 and 100
            bar.style.height = randomHeight + '%';  // Apply random height
        });
    }, 2000); // Change every 2 seconds
};


//documentExpiring
// Fetching document data dynamically from the table
const documentExpiringContainer = document.querySelector("#documentExpiring .document-list");
const documentsTableBody = document.querySelector("#documentsTable tbody");

// Helper function to calculate days left
function calculateDaysLeft(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffInTime = expiry - today;
    return Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}

// Function to render expiring documents
function renderExpiringDocuments() {
    // Clear previous expiring documents
    documentExpiringContainer.innerHTML = "";

    // Iterate over table rows to check for expiration
    const rows = documentsTableBody.querySelectorAll("tr");
    rows.forEach((row) => {
        const docTitle = row.querySelector("td:nth-child(1)").textContent; // Get title
        const expiryDate = row.querySelector("td:nth-child(3)").textContent; // Get expiry date

        const daysLeft = calculateDaysLeft(expiryDate);

        // Determine the status class
        let statusClass = "safe";
        if (daysLeft <= 7 && daysLeft > 0) statusClass = "soon";
        else if (daysLeft <= 0) statusClass = "expired";

        // Only show expiring or expired documents
        if (daysLeft <= 7) {
            const documentItem = document.createElement("div");
            documentItem.className = "document-item";

            documentItem.innerHTML = `
                <div class="document-name">${docTitle}</div>
                <div class="document-expiry">${expiryDate}</div>
                <div class="status-badge ${statusClass}">
                    ${daysLeft <= 0 ? "Expired" : `${daysLeft} days`}
                </div>
            `;

            documentExpiringContainer.appendChild(documentItem);
        }
    });
}

// Re-render expiring documents after uploading a new document
document.getElementById("documentForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Example: Add new document data to the table dynamically
    const docTitle = document.getElementById("docTitle").value;
    const docType = document.getElementById("docType").value;
    const expirationDate = document.getElementById("expirationDate").value;

    const newRow = documentsTableBody.insertRow();
    newRow.innerHTML = `
        <td>${docTitle}</td>
        <td>${docType}</td>
        <td>${expirationDate}</td>
        <td><a href="#">Download</a></td>
        <td><button class="delete-btn">Delete</button></td>
    `;

    // Clear the form after submission
    this.reset();

    // Re-render expiring documents
    renderExpiringDocuments();
});

// Handle delete button functionality
documentsTableBody.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        const row = e.target.closest("tr");
        row.remove();
        renderExpiringDocuments();
    }
});

// Initial render for any pre-existing documents
renderExpiringDocuments();

 

//calendar
const calendarContainer = document.querySelector(".calendar-grid");
const currentMonthEl = document.getElementById("currentMonth");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const reminderModal = document.getElementById("reminderModal");
const closeModal = document.querySelector(".close");
const saveReminderBtn = document.getElementById("saveReminder");
const reminderInput = document.getElementById("reminderInput");
const selectedDateEl = document.getElementById("selectedDate");

let currentDate = new Date();
let reminders = {};

// Holidays for demonstration
const holidays = {
    2024: {
        11: {
            25: "Christmas",
        },
        0: {
            1: "New Year's Day",
        },
    },
};

// Generate the calendar
function generateCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    currentMonthEl.textContent = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
    calendarContainer.innerHTML = "";

    // Fill empty cells before the first day
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        emptyCell.className = "calendar-day empty";
        calendarContainer.appendChild(emptyCell);
    }

    // Fill days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.className = "calendar-day";
        dayCell.textContent = day;

        // Highlight holidays
        if (holidays[year] && holidays[year][month] && holidays[year][month][day]) {
            dayCell.classList.add("holiday");
            const holidayLabel = document.createElement("div");
            holidayLabel.className = "reminder";
            holidayLabel.textContent = holidays[year][month][day];
            dayCell.appendChild(holidayLabel);
        }

        // Add reminders
        if (reminders[`${year}-${month}-${day}`]) {
            const reminderLabel = document.createElement("div");
            reminderLabel.className = "reminder";
            reminderLabel.textContent = reminders[`${year}-${month}-${day}`];
            dayCell.appendChild(reminderLabel);
        }

        // Open modal on click
        dayCell.addEventListener("click", () => {
            selectedDateEl.textContent = `${day} ${date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`;
            reminderModal.style.display = "block";
            reminderInput.value = reminders[`${year}-${month}-${day}`] || "";
            reminderInput.dataset.date = `${year}-${month}-${day}`;
        });

        calendarContainer.appendChild(dayCell);
    }
}

// Handle navigation
prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generateCalendar(currentDate);
});

nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generateCalendar(currentDate);
});

// Close modal
closeModal.addEventListener("click", () => {
    reminderModal.style.display = "none";
});

// Save reminder
saveReminderBtn.addEventListener("click", () => {
    const date = reminderInput.dataset.date;
    reminders[date] = reminderInput.value;
    reminderModal.style.display = "none";
    generateCalendar(currentDate);
});

// Initialize calendar
generateCalendar(currentDate);
