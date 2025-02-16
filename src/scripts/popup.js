const calendarContainer = document.getElementById("calendar-container");
const monthYearDisplay = document.getElementById("month-year");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const totalMarkedDisplay = document.getElementById("total-marked");
const monthTotalDisplay = document.getElementById("month-total");
const modal = document.getElementById("modal");
const closeButton = document.querySelector(".close-button");
const questionsInput = document.getElementById("questions-input");
const saveButton = document.getElementById("save-button");

let currentDate = new Date();
let selectedDay = null;

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function createCalendar(date) {
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  let calendarHTML = dayNames.map(day => `<div class="day-header">${day}</div>`).join("");

  for (let i = 0; i < firstDay; i++) {
    calendarHTML += `<div class="day empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarHTML += `<div class="day" data-day="${day}"><span class="date">${day}</span><span class="value"></span></div>`;
  }

  calendarContainer.innerHTML = calendarHTML;
  monthYearDisplay.textContent = `${date.toLocaleString('default', { month: 'long' })} ${currentYear}`;
}

function handleDayClick(event) {
  const target = event.target.closest(".day");
  if (!target) return;

  selectedDay = target.dataset.day;
  questionsInput.value = '';
  modal.classList.add("show");
  questionsInput.focus(); // Automatically focus on the text box
}

function handleSaveClick() {
  if (selectedDay === null) return;

  const solved = parseInt(questionsInput.value, 10);
  if (!isNaN(solved) && solved >= 0) { // Ensure no negative values
    chrome.storage.sync.set({ [`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${selectedDay}`]: solved }, () => {
      const dayElement = document.querySelector(`.day[data-day="${selectedDay}"]`);
      if (dayElement) {
        dayElement.querySelector(".value").textContent = `(${solved})`;
        dayElement.classList.add("filled");
        updateTotalMarked();
      }
      modal.classList.remove("show");
    });
  }
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    handleSaveClick();
  }
}

function loadSavedData() {
  chrome.storage.sync.get(null, (data) => {
    let totalMarked = 0;
    let monthTotal = 0;
    for (const [key, solved] of Object.entries(data)) {
      const [year, month, day] = key.split('-');
      if (parseInt(year) === currentDate.getFullYear() && parseInt(month) === currentDate.getMonth() + 1) {
        const dayElement = document.querySelector(`.day[data-day="${day}"]`);
        if (dayElement) {
          dayElement.querySelector(".value").textContent = `(${solved})`;
          dayElement.classList.add("filled");
          monthTotal += solved;
        }
      }
      totalMarked += solved;
    }
    totalMarkedDisplay.textContent = `Total done: ${totalMarked}`;
    monthTotalDisplay.textContent = `Total this month: ${monthTotal}`;
  });
}

function updateTotalMarked() {
  chrome.storage.sync.get(null, (data) => {
    let totalMarked = 0;
    let monthTotal = 0;
    for (const [key, solved] of Object.entries(data)) {
      const [year, month] = key.split('-');
      if (parseInt(year) === currentDate.getFullYear() && parseInt(month) === currentDate.getMonth() + 1) {
        monthTotal += solved;
      }
      totalMarked += solved;
    }
    totalMarkedDisplay.textContent = `Total done: ${totalMarked}`;
    monthTotalDisplay.textContent = `Total this month: ${monthTotal}`;
  });
}

function navigateMonth(offset) {
  currentDate.setMonth(currentDate.getMonth() + offset);
  createCalendar(currentDate);
  loadSavedData();
}

function updateTimer() {
  const targetDate = new Date('June 1, 2025 00:00:00').getTime();
  const now = new Date().getTime();
  const distance = targetDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").textContent = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    document.getElementById("timer").textContent = "The date has passed.";
  }
}

setInterval(updateTimer, 1000);

document.addEventListener("DOMContentLoaded", () => {
  createCalendar(currentDate);
  loadSavedData();
  calendarContainer.addEventListener("click", handleDayClick);
  saveButton.addEventListener("click", handleSaveClick);
  questionsInput.addEventListener("keypress", handleKeyPress); // Add event listener for Enter key
  closeButton.addEventListener("click", () => modal.classList.remove("show"));
  prevButton.addEventListener("click", () => navigateMonth(-1));
  nextButton.addEventListener("click", () => navigateMonth(1));
  updateTimer();
});