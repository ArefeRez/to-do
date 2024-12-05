document.addEventListener("DOMContentLoaded", function () {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const myDayTasks = document.getElementById("myDayTasks");
  const importantTasks = document.getElementById("importantTasks");
  const myDayContent = document.getElementById("myDayContent");
  const importantContent = document.getElementById("importantContent");
  const waterContent = document.getElementById("waterContent");
  const waterSection = document.getElementById("waterSection");
  const sidebarItems = document.querySelectorAll('.task-list-item');
  const dayDisplay = document.getElementById("dayDisplay");
  const body = document.body;

  const glasses = document.querySelectorAll('.glass');
  const box = document.getElementById('waterBox');
  const waterLevel = document.getElementById('waterLevel');
  const message = document.getElementById('message');
  let filledGlasses = 0;

  // Task Counter Elements
  const totalTasksCount = document.getElementById('totalTasks');
  const completedTasksCount = document.getElementById('completedTasks');
  let totalTasks = 0;
  let completedTasks = 0;

  function setActiveSidebarItem(clickedItem) {
    sidebarItems.forEach(item => {
      item.classList.remove("active");
    });

    clickedItem.classList.add("active");
  }

  waterSection.addEventListener("click", function () {
    setActiveSidebarItem(waterSection);

    waterContent.style.display = "block";
    myDayContent.style.display = "none";
    importantContent.style.display = "none";

    body.style.backgroundColor = "#E1F5FE";

    taskInput.disabled = true;
  });

  const myDaySection = document.getElementById("myDaySection");
  const importantSection = document.getElementById("importantSection");

  myDaySection.addEventListener("click", function () {
    setActiveSidebarItem(myDaySection);
    myDayContent.style.display = "block";
    importantContent.style.display = "none";
    waterContent.style.display = "none";

    body.style.backgroundColor = "";

    taskInput.disabled = false;
  });

  importantSection.addEventListener("click", function () {
    setActiveSidebarItem(importantSection);
    importantContent.style.display = "block";
    myDayContent.style.display = "none";
    waterContent.style.display = "none";

    body.style.backgroundColor = "";

    taskInput.disabled = false;
  });

  function addTask() {
    const inputValue = taskInput.value.trim();
    if (inputValue === "") return;

    const li = document.createElement("li");
    li.classList.add("task-item");
    li.innerHTML = `
      ${inputValue}
      <span class="action-icons">
        <i class="bi bi-check2 btn-action"></i>
        <i class="bi bi-trash btn-action"></i>
      </span>
    `;

    if (myDayContent.style.display === "block") {
      myDayTasks.appendChild(li);
    } else if (importantContent.style.display === "block") {
      importantTasks.appendChild(li);
    } else if (waterContent.style.display === "block") {
      const waterTasks = document.getElementById("waterTasks");
      waterTasks.appendChild(li);
    }

    taskInput.value = "";
    totalTasks++;
    updateTaskCounter();
  }

  addTaskButton.addEventListener("click", function (event) {
    event.preventDefault();
    addTask();
  });

  function updateTaskCounter() {
    totalTasksCount.textContent = totalTasks;
    completedTasksCount.textContent = completedTasks;
  }

  function displayDate() {
    const today = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayName = daysOfWeek[today.getDay()];
    const date = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    dayDisplay.textContent = `${dayName}, ${date}/${month}/${year}`;
  }

  displayDate();  // Display the current date when the page loads


  const darkModeButton = document.getElementById("darkModeButton");

  darkModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("bi-trash")) {
      const parentLi = event.target.closest("li");
      parentLi.remove();
      totalTasks--;
      updateTaskCounter();
    } else if (event.target.classList.contains("bi-check2")) {
      const parentLi = event.target.closest("li");
      parentLi.classList.toggle("checked");

      if (parentLi.classList.contains("checked")) {
        completedTasks++;
      } else {
        completedTasks--;
      }

      updateTaskCounter();
    }
  });

  myDaySection.click();

  glasses.forEach((glass, index) => {
    glass.addEventListener("click", function () {
      if (!glass.classList.contains("filled")) {
        glass.classList.add("filled");
        glass.classList.add("selected");
        filledGlasses++;
      } else {
        glass.classList.remove("filled");
        glass.classList.remove("selected");
        filledGlasses--;
      }

      const percentage = (filledGlasses / glasses.length) * 100;
      waterLevel.style.height = `${percentage}%`;

      if (filledGlasses === glasses.length) {
        message.style.display = "block";
      } else {
        message.style.display = "none";
      }
    });
  });

  waterSection.addEventListener("click", function () {
    filledGlasses = 0;
    glasses.forEach(glass => {
      glass.classList.remove("filled");
      glass.classList.remove("selected");
    });
    waterLevel.style.height = "0%";
    message.style.display = "none";
  });

  // Calendar Section
  const calendarSection = document.getElementById("calendarSection");
  const calendarContent = document.getElementById("calendarContent");

  calendarSection.addEventListener("click", function () {
    setActiveSidebarItem(calendarSection);

    // Hide all other content and show the calendar
    myDayContent.style.display = "none";
    importantContent.style.display = "none";
    waterContent.style.display = "none";
    calendarContent.style.display = "block";  // Show calendar

    body.style.backgroundColor = "";

    taskInput.disabled = false;
  });

  // Create and Display Calendar
  const calendar = document.getElementById("calendar");

  function generateCalendar() {
    const currentMonth = new Date();
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const calendarDays = calendar.querySelector('.calendar-days');
    calendarDays.innerHTML = '';  // Clear previous month

    // Fill in the days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const day = document.createElement("div");
      day.classList.add("calendar-day");
      day.textContent = i;
      calendarDays.appendChild(day);
    }
  }

  generateCalendar();  // Initial calendar generation
});



  









  
  
  
  





  