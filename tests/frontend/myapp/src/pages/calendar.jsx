import React, { useState, useEffect } from "react";

// Функция для получения количества дней в месяце
const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();

// Функция для преобразования списка событий в удобную структуру
const processEvents = (events) => {
  const eventMap = {};

  events.forEach(({ description, start_date, title }) => {
    const eventDate = new Date(start_date);
    const year = eventDate.getFullYear();
    const month = eventDate.getMonth() + 1;
    const day = eventDate.getDate();

    if (!eventMap[year]) eventMap[year] = {};
    if (!eventMap[year][month]) eventMap[year][month] = {};
    if (!eventMap[year][month][day]) eventMap[year][month][day] = [];

    eventMap[year][month][day].push({ title, description });
  });

  return eventMap;
};

const Calendar = ({ eventsData }) => {
  const [currentYear, setCurrentYear] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);
  const [eventMap, setEventMap] = useState({});

  // Устанавливаем текущий месяц и год при загрузке страницы
  useEffect(() => {
    const today = new Date();
    setCurrentYear(today.getFullYear());
    setCurrentMonth(today.getMonth() + 1);
    setEventMap(processEvents(eventsData));
  }, [eventsData]);

  if (!currentYear || !currentMonth) return <p>Загрузка...</p>;

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const hasEvents = eventMap[currentYear]?.[currentMonth] || {};

  // Переключение месяца
  const changeMonth = (delta) => {
    let newMonth = currentMonth + delta;
    let newYear = currentYear;

    if (newMonth < 1) {
      newMonth = 12;
      newYear -= 1;
    } else if (newMonth > 12) {
      newMonth = 1;
      newYear += 1;
    }

    if (newYear >= 2022 && newYear <= 2026) {
      setCurrentYear(newYear);
      setCurrentMonth(newMonth);
    }
  };

  return (
    <div className="relative p-4 border rounded-lg shadow-lg w-96 bg-white">
      <div className="flex justify-between items-center mb-2">
        <button
          className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
          onClick={() => changeMonth(-1)}
        >
          ◀
        </button>
        <p className="text-center font-semibold">{currentMonth}/{currentYear}</p>
        <button
          className="px-2 py-1 bg-gray-300 rounded-md hover:bg-gray-400"
          onClick={() => changeMonth(1)}
        >
          ▶
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(daysInMonth)].map((_, index) => {
          const day = index + 1;
          const eventsForDay = hasEvents[day];

          return (
            <div
              key={day}
              className={`relative w-12 h-12 flex items-center justify-center rounded-md transition-all duration-200 cursor-pointer
                ${eventsForDay ? "bg-blue-200 hover:bg-blue-400" : "bg-gray-100 hover:bg-gray-200"}`}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {day}

              {hoveredDay === day && eventsForDay && (
                <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-white border shadow-lg p-2 w-48 rounded-lg z-10">
                  {eventsForDay.map((event, idx) => (
                    <div key={idx} className="p-1 border-b last:border-none">
                      <p className="font-semibold">{event.title}</p>
                      <p className="text-sm text-gray-600">{event.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
