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
    }
  
    addTaskButton.addEventListener("click", function (event) {
      event.preventDefault();
      addTask();
    });
  
    function displayDate() {
      const today = new Date();
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayName = daysOfWeek[today.getDay()];
      const date = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      dayDisplay.textContent = `${dayName}, ${date}/${month}/${year}`;
    }
  
    displayDate();
  
    document.addEventListener("click", function (event) {
      if (event.target.classList.contains("bi-trash")) {
        const parentLi = event.target.closest("li");
        parentLi.remove();
      } else if (event.target.classList.contains("bi-check2")) {
        const parentLi = event.target.closest("li");
        parentLi.classList.toggle("checked");
      }
    });
  
    myDaySection.click();
  
    glasses.forEach((glass, index) => {
      glass.addEventListener("click", function () {
        if (!glass.classList.contains("filled")) {
          glass.classList.add("filled");
          glass.classList.add("selected"); // افزودن سایه به لیوان انتخاب شده
          filledGlasses++;
        } else {
          glass.classList.remove("filled");
          glass.classList.remove("selected");
          filledGlasses--;
        }
  
        // بروزرسانی نوار وضعیت
        const percentage = (filledGlasses / glasses.length) * 100;
        waterLevel.style.height = `${percentage}%`;
  
        // نمایش پیام وقتی همه لیوان‌ها پر شده باشند
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
        glass.classList.remove("selected"); // ریست کردن کلاس selected
      });
      waterLevel.style.height = "0%";
      message.style.display = "none";
    });
  });
  









  
  
  
  





  