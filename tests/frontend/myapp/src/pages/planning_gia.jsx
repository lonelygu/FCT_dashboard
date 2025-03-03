import React, { useState } from "react";

const YearSelector = ({ onYearChange }) => (
  <div className="flex space-x-4 mb-5">
    {[2023, 2024, 2025].map((year) => (
      <button
        key={year}
        onClick={() => onYearChange(year)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        {year}
      </button>
    ))}
  </div>
);

const GiaSelector = ({ onGiaChange }) => (
  <div className="flex space-x-4 mt-3">
    <button
      onClick={() => onGiaChange("ГИА-9")}
      className="px-4 py-2 bg-gray-600 text-white rounded-b-lg rounded-t-lg hover:bg-gray-700 transition duration-200"
    >
      ГИА-9
    </button>
    <button
      onClick={() => onGiaChange("ГИА-11")}
      className="px-4 py-2 bg-gray-600 text-white rounded-b-lg rounded-t-lg hover:bg-gray-700 transition duration-200"
    >
      ГИА-11
    </button>
  </div>
);

const FilterButton = ({ label, options, activeFilter, setActiveFilter, nonClickableHeaders = [], onItemSelect }) => {
  const isOpen = activeFilter === label;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setActiveFilter(isOpen ? null : label)}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition duration-200 flex items-center"
      >
        {label}
        <span className={`ml-2 transform transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="absolute mt-2 w-60 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => {
                  if (!nonClickableHeaders.includes(option)) {
                    onItemSelect(option);
                  }
                }}
                className={`px-4 py-2 ${nonClickableHeaders.includes(option) ? "font-bold bg-white cursor-default" : "hover:bg-gray-200 cursor-pointer"}`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const PlanningGIA = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [giaType, setGiaType] = useState("ГИА-11");
  const [activeFilter, setActiveFilter] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null); // Track selected form

  const gia9Subjects = [
    "ОГЭ",
    "Русский язык", "Математика", "Физика", "Химия", "Информатика", "Биология",
    "История", "География", "Английский язык", "Немецкий язык", "Французский язык",
    "Обществознание", "Испанский язык", "Литература",
    "Физика (КОГЭ)", "Информатика (КОГЭ)", "География (КОГЭ)",
    "Английский язык (устный)", "Немецкий язык (устный)", "Французский язык (устный)",
    "Испанский язык (устный)",
    "ГВЭ",
    "Русский язык", "Математика","Физика", "Химия", "Информатика", "Биология",
    "История", "География", "Английский язык","Обществознание","Литература"
  ];

  const gia11Subjects = [
    "ЕГЭ",
    "Русский язык", "Математика профильная", "Физика", "Химия", "Биология",
    "История", "География", "Английский язык", "Немецкий язык", "Французский язык",
    "Обществознание", "Испанский язык", "Китайский язык", "Литература",
    "Математика базовая", "Информатика (КЕГЭ)",
    "Английский язык (устный)", "Немецкий язык (устный)", "Французский язык (устный)",
    "Испанский язык (устный)", "Китайский язык (устный)",
    "ГВЭ",
    "Русский язык", "Математика"
  ];

  const gia9Dates = [
    "21 февраля", "27 февраля", "29 февраля", "04 марта", "06 марта", "11 марта", "13 марта",
    "14 марта", "15 марта", "23 апреля", "26 апреля", "03 мая", "07 мая", "13 мая", "14 мая",
    "15 мая", "16 мая", "18 мая", "21 мая", "22 мая", "27 мая", "30 мая", "03 июня", "06 июня",
    "10 июня", "11 июня", "14 июня", "24 июня", "25 июня", "26 июня", "27 июня", "01 июля", "02 июля",
    "03 сентября", "06 сентября", "10 сентября", "13 сентября", "18 сентября", "19 сентября", "20 сентября",
    "23 сентября", "24 сентября"
  ];

  const gia11Dates = [
    "20 февраля", "21 февраля", "24 февраля", "25 февраля", "26 февраля", "27 февраля",
    "28 февраля", "03 марта", "21 марта", "25 марта", "28 марта", "01 апреля",
    "04 апреля", "08 апреля", "11 апреля", "14 апреля", "17 апреля", "18 апреля",
    "21 апреля", "23 мая", "27 мая", "30 мая", "02 июня", "05 июня", "10 июня",
    "11 июня", "16 июня", "17 июня", "18 июня", "19 июня", "20 июня", "23 июня",
    "03 июля", "04 июля"
  ];

  const periods = ["досрочный", "основной", "дополнительный"];

  const forms = giaType === "ГИА-9" ? ["ОГЭ", "ГВЭ"] : ["ЕГЭ", "ГВЭ"];

  const handleGiaSelect = (type) => {
    setGiaType(type);
    setSelectedSubject(null);
    setSelectedDate(null);
    setSelectedPeriod(null);
    setSelectedForm(null); // Reset form when GIA type changes
  };

  const handleSubjectSelect = (subject) => {
    if (subject === "ЕГЭ" || subject === "ОГЭ" || subject === "ГВЭ") {
      return; // Не изменяем состояние, если выбрана некликабельная опция
    }
    setSelectedSubject(subject);
    setActiveFilter(null);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setActiveFilter(null);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setActiveFilter(null);
  };

  const handleFormSelect = (form) => {
    setSelectedForm(form);
    setActiveFilter(null);
  };

  const subjectButtonText = selectedSubject ? `По предмету: ${selectedSubject}` : "Выберите предмет";
  const dateButtonText = selectedDate ? `По дате: ${selectedDate}` : "Выберите дату";
  const periodButtonText = selectedPeriod ? `По периоду: ${selectedPeriod}` : "Выберите период";
  const formButtonText = selectedForm ? `Форма проведения: ${selectedForm}` : "Выберите форму проведения";

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Планирование ГИА</h1>
      <YearSelector onYearChange={setYear} />
      <GiaSelector onGiaChange={handleGiaSelect} />
      <p className="text-lg mt-3">
        Выбранный год: <strong>{year}</strong>
      </p>
      {giaType && (
        <p className="text-lg mt-1">
          Выбранный тип ГИА: <strong>{giaType}</strong>
        </p>
      )}

      <div className="flex space-x-4 mt-5 flex-wrap">
        <FilterButton
          label={subjectButtonText}
          options={giaType === "ГИА-9" ? gia9Subjects : gia11Subjects}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          nonClickableHeaders={giaType === "ГИА-9" ? ["ОГЭ", "ГВЭ"] : giaType === "ГИА-11" ? ["ЕГЭ", "ГВЭ"] : []}
          onItemSelect={handleSubjectSelect}
        />
        <FilterButton
          label={dateButtonText}
          options={giaType === "ГИА-9" ? gia9Dates : gia11Dates}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onItemSelect={handleDateSelect}
        />
        <FilterButton
          label={periodButtonText}
          options={periods}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onItemSelect={handlePeriodSelect}
        />
        <FilterButton
          label={formButtonText}
          options={forms}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          onItemSelect={handleFormSelect}
        />
      </div>
    </div>
  );
};

export default PlanningGIA;
