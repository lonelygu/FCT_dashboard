// EventCalendar.jsx

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Стандартные стили

const EventCalendar = ({ events }) => {
  const [date, setDate] = useState(new Date());

  // Функция для проверки наличия события на выбранной дате
  const hasEvent = (date) => {
    return events.some(
      (event) =>
        new Date(event.date).toLocaleDateString() === date.toLocaleDateString()
    );
  };

  // Функция для получения события на выбранной дате
  const getEvent = (date) => {
    return events.find(
      (event) =>
        new Date(event.date).toLocaleDateString() === date.toLocaleDateString()
    );
  };

  return (
    <div className="relative">
      <Calendar
        onChange={setDate}
        value={date}
        tileClassName={({ date }) =>
          hasEvent(date) ? 'bg-blue-500 text-white' : ''
        }
        tileContent={({ date }) =>
          hasEvent(date) ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs">•</span>
            </div>
          ) : null
        }
      />
      {hasEvent(date) && (
        <div className="absolute top-0 left-0 mt-12 ml-4 p-2 bg-white border border-gray-300 rounded shadow-lg">
          <p className="text-sm font-semibold">{getEvent(date).title}</p>
          <p className="text-xs">{getEvent(date).description}</p>
        </div>
      )}
    </div>
  );
};

export default EventCalendar;
