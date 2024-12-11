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
const documentData = [
    { name: "Passport", expiryDate: "2024-12-15" },
    { name: "Visa", expiryDate: "2024-12-12" },
    { name: "Work Permit", expiryDate: "2025-01-01" },
    { name: "Insurance", expiryDate: "2024-12-05" },
];

const documentExpiringContainer = document.querySelector("#documentExpiring .document-list");

// Helper function to calculate days left
function calculateDaysLeft(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffInTime = expiry - today;
    return Math.ceil(diffInTime / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
}

// Render document items
documentData.forEach((doc) => {
    const daysLeft = calculateDaysLeft(doc.expiryDate);

    // Determine the status class
    let statusClass = "safe";
    if (daysLeft <= 7 && daysLeft > 0) statusClass = "soon";
    else if (daysLeft <= 0) statusClass = "expired";

    // Create document item
    const documentItem = document.createElement("div");
    documentItem.className = "document-item";

    documentItem.innerHTML = `
        <div class="document-name">${doc.name}</div>
        <div class="document-expiry">${doc.expiryDate}</div>
        <div class="status-badge ${statusClass}">
            ${daysLeft <= 0 ? "Expired" : `${daysLeft} days`}
        </div>
    `;

    documentExpiringContainer.appendChild(documentItem);
});
 

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
