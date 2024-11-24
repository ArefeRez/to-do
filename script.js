document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const taskList = document.getElementById("box");
    const addTaskButton = document.getElementById("addTaskButton");
    const dayDisplay = document.getElementById("dayDisplay");
    const myDayElement = document.getElementById("myDay");

    // فعال کردن My Day به صورت پیش‌فرض
    myDayElement.classList.add("active");

    // افزودن وظیفه با کلیک روی دکمه
    addTaskButton.addEventListener("click", function (event) {
        event.preventDefault(); // جلوگیری از ارسال فرم
        addTask();
    });

    // افزودن وظیفه با تغییر ورودی
    taskInput.addEventListener("change", function () {
        addTask();
    });

    // تابع افزودن وظیفه
    function addTask() {
        const inputValue = taskInput.value;
        if (inputValue.trim() !== "") {
            const li = document.createElement("li");
            li.classList.add("task-item");
            li.innerHTML = `
                ${inputValue} 
                <span class="action-icons">
                    <i class="bi bi-check2 btn-action"></i>
                    <i class="bi bi-trash btn-action"></i>
                </span>
            `;
            taskList.appendChild(li);
            taskInput.value = ""; // پاک کردن ورودی پس از افزودن

            // ذخیره وظیفه در LocalStorage
            saveTasksToLocalStorage();
        }
    }

    // ذخیره وظایف در LocalStorage
    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach(task => {
            tasks.push({
                text: task.innerText,
                checked: task.classList.contains("checked")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // بارگذاری وظایف از LocalStorage
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks"));
        if (tasks) {
            tasks.forEach(taskData => {
                const li = document.createElement("li");
                li.classList.add("task-item");
                li.innerHTML = `
                    ${taskData.text}
                    <span class="action-icons">
                        <i class="bi bi-check2 btn-action"></i>
                        <i class="bi bi-trash btn-action"></i>
                    </span>
                `;
                if (taskData.checked) {
                    li.classList.add("checked");
                }
                taskList.appendChild(li);
            });
        }
    }

    // مدیریت حذف وظیفه
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("bi-trash")) {
            const parentLi = event.target.closest("li");
            parentLi.style.transition = "opacity 0.2s ease";
            parentLi.style.opacity = 0;
            setTimeout(() => {
                parentLi.remove();
                saveTasksToLocalStorage(); // ذخیره‌سازی پس از حذف
            }, 200); // حذف بعد از انیمیشن
        }
    });

    // تغییر وضعیت به "انجام‌شده"
    taskList.addEventListener("click", function (event) {
        if (event.target.classList.contains("bi-check2")) {
            const parentLi = event.target.closest("li");
            parentLi.classList.toggle("checked");
            saveTasksToLocalStorage(); // ذخیره‌سازی پس از تغییر وضعیت
        }
    });

    // تابع برای گرفتن روز و تاریخ
    function displayDate() {
        const today = new Date();
        
        // لیست روزهای هفته
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayName = daysOfWeek[today.getDay()]; // دریافت روز هفته
        const date = today.getDate(); // روز ماه
        const month = today.getMonth() + 1; // ماه (از 0 شروع می‌شود)
        const year = today.getFullYear(); // سال

        // نمایش روز، تاریخ و ماه
        dayDisplay.innerHTML = `${dayName}, ${date}/${month}/${year}`;
    }

    displayDate(); // نمایش تاریخ و روز هنگام بارگذاری صفحه

    // بارگذاری وظایف از LocalStorage هنگام بارگذاری صفحه
    loadTasksFromLocalStorage();
});





  