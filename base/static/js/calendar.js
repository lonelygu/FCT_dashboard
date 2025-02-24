document.addEventListener("DOMContentLoaded", function () {
    const calendarBody = document.getElementById("calendar-body");
    const currentMonthLabel = document.getElementById("current-month");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");
    const eventsList = document.getElementById("events-list");
    let popup = null;
    let isPopupVisible = false;

    let currentDate = new Date();
    let selectedDate = new Date();  // Дата, которая будет отображаться в списке
    let eventsData = [];

    // Количество событий, отображаемых на одной странице
    let eventsPerPage = 12;
    let currentIndex = 0;

    // Загрузка событий при запуске
    function loadEvents() {
        fetch("/get-events")
            .then(response => response.json())
            .then(data => {
                eventsData = data;
                renderCalendar();  // Рендерим календарь
                renderEventsList();  // Рендерим список событий с текущей даты
            })
            .catch(error => console.error("Error loading events:", error));
    }

    // Рендерим календарь
    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        currentMonthLabel.textContent = new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(currentDate);

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        const firstDayIndex = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

        calendarBody.innerHTML = "";  // Очистка календаря
        let row = document.createElement("tr");

        // Создание пустых ячеек перед началом месяца
        for (let i = 0; i < firstDayIndex; i++) {
            row.appendChild(document.createElement("td"));
        }

        // Добавление ячеек с днями месяца
        for (let day = 1; day <= lastDateOfMonth; day++) {
            const cell = document.createElement("td");
            const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

            const dayNumber = document.createElement("div");
            dayNumber.classList.add("day-number");
            dayNumber.textContent = day;
            cell.appendChild(dayNumber);

            const event = eventsData.filter(e => e.date === fullDate);
            if (event.length > 0) {
                const dot = document.createElement("div");
                dot.classList.add("dot");
                dot.setAttribute("data-event", event[0].event);
                cell.appendChild(dot);

                // Удаляем старые обработчики событий, если они есть
                cell.removeEventListener("mouseenter", showEventsPopup);
                cell.removeEventListener("click", selectDateAndRenderEvents);

                cell.addEventListener("mouseenter", () => showEventsPopup(cell, event));
                cell.addEventListener("click", () => selectDateAndRenderEvents(fullDate, event));

                cell.classList.add("event-day");
            }

            row.appendChild(cell);

            // Переход на новую строку по завершению недели (7 дней)
            if ((firstDayIndex + day) % 7 === 0) {
                calendarBody.appendChild(row);
                row = document.createElement("tr");
            }
        }

        // Добавление последней строки, если она не завершена
        if (row.children.length > 0) {
            calendarBody.appendChild(row);
        }
    }

    // Рендерим список событий начиная с текущего дня или выбранной даты
    function renderEventsList() {
        eventsList.innerHTML = ''; // Очищаем текущий список событий

        const start = currentIndex * eventsPerPage;
        const end = start + eventsPerPage;
        const eventsToDisplay = eventsData.slice(start, end);

        eventsToDisplay.forEach(event => {
            const listItem = document.createElement("div");
            listItem.classList.add("event-item");

            const eventDate = document.createElement("div");
            eventDate.classList.add("event-date");
            eventDate.textContent = new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(event.date));
            listItem.appendChild(eventDate);

            const eventTitle = document.createElement("div");
            eventTitle.classList.add("event-title");
            eventTitle.textContent = event.event;
            listItem.appendChild(eventTitle);

            if (event.description) {
                const eventDescription = document.createElement("div");
                eventDescription.classList.add("event-description");
                eventDescription.textContent = event.description;
                listItem.appendChild(eventDescription);
            }

            eventsList.appendChild(listItem);
        });
    }

    // Функция для отображения всплывающего окна с событиями
    function showEventsPopup(cell, events) {
        if (popup) {
            popup.remove();
        }

        popup = document.createElement("div");
        popup.classList.add("events-popup");

        let list = document.createElement("ul");
        events.forEach(event => {
            let listItem = document.createElement("li");
            let dot = document.createElement("span");
            dot.classList.add("dot");
            dot.style.backgroundColor = getEventColor(event.event);
            listItem.appendChild(dot);
            listItem.textContent = event.event + ": " + event.description;
            list.appendChild(listItem);
        });

        popup.appendChild(list);
        document.body.appendChild(popup);

        const rect = cell.getBoundingClientRect();
        popup.style.top = `${rect.top + window.scrollY + 20}px`;
        popup.style.left = `${rect.left + window.scrollX + 10}px`;

        popup.style.display = "block";
        isPopupVisible = true;

        popup.addEventListener("mouseenter", () => {
            isPopupVisible = true;
        });

        popup.addEventListener("mouseleave", () => {
            isPopupVisible = false;
            removePopupAfterDelay();
        });

        cell.addEventListener("mouseleave", () => {
            isPopupVisible = false;
            removePopupAfterDelay();
        });

        document.addEventListener("mousemove", function (e) {
            if (popup && !popup.contains(e.target) && cell && !cell.contains(e.target)) {
                isPopupVisible = false;
                removePopupAfterDelay();
            }
        });
    }

    // Убираем всплывающее окно с задержкой
    function removePopupAfterDelay() {
        setTimeout(() => {
            if (!isPopupVisible && popup) {
                popup.remove();
                popup = null;
            }
        }, 200);
    }

    // Выбор даты и рендеринг событий для выбранной даты
    function selectDateAndRenderEvents(date, events) {
        selectedDate = new Date(date);
        renderEventsList();
    }

    // Функция для получения цвета события
    function getEventColor(eventType) {
        switch (eventType) {
            case "ГИА-9":
                return "#FFD700"; // Желтый
            case "ГИА-11":
                return "#32CD32"; // Зеленый
            case "Конференция":
                return "#FF4500"; // Оранжевый
            case "Семинар":
                return "#007BFF"; // Синий
            default:
                return "#000000"; // Черный по умолчанию
        }
    }

    // Обработка перехода на предыдущий месяц
    prevMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
        renderEventsList();  // Обновляем список событий
    });

    // Обработка перехода на следующий месяц
    nextMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
        renderEventsList();  // Обновляем список событий
    });

    // Обработчики для кнопок прокрутки списка событий
    const prevButton = document.getElementById("prev-events");
    const nextButton = document.getElementById("next-events");

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            renderEventsList();
        }
    });

    nextButton.addEventListener("click", function () {
        if ((currentIndex + 1) * eventsPerPage < eventsData.length) {
            currentIndex++;
            renderEventsList();
        }
    });

    // Загружаем события при запуске страницы
    loadEvents();
});
