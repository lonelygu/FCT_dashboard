import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { useNavigate } from "react-router-dom";
import '../styles.css';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

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

const ChartContainer = ({ chartData1, chartData2, chartData3, loading }) => (
  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    {loading ? (
      <p className="text-lg text-gray-500">Загрузка данных...</p>
    ) : (
      <>
        {[chartData1, chartData2, chartData3].map((data, index) => (
          <div key={index} className="w-full h-[300px]">
            {data ? (
              <Pie
                data={data}
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      labels: {
                        font: {
                          family: "Helvetica",
                          size: 14,
                        },
                        color: "#333",
                      },
                    },
                    tooltip: {
                      bodyFont: {
                        family: "Helvetica",
                        size: 14,
                      },
                      callbacks: {
                        label: (tooltipItem) => {
                          const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
                          const percentage = ((tooltipItem.raw / total) * 100).toFixed(2);
                          return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
                        },
                      },
                    },
                  },
                }}
              />
            ) : (
              <p className="text-lg text-gray-500">Нет данных.</p>
            )}
          </div>
        ))}
      </>
    )}
  </div>
);

const EventsList = ({ events }) => {
  const navigate = useNavigate();

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-3">Последние события</h2>
      <ul className="bg-gray-100 p-4 rounded-lg shadow-md">
        {events.length > 0 ? (
          events.slice(0, 5).map((event, index) => (
            <li key={index} className="border-b py-2 last:border-b-0">
              <p className="font-semibold">{event.title}</p>
              <p><strong>Тип:</strong> {event.type}</p>
              <p><strong>Описание:</strong> {event.description}</p>
              <p><strong>Дата начала:</strong> {new Date(event.start_date).toLocaleDateString()}</p>
              <p><strong>Дата окончания:</strong> {new Date(event.end_date).toLocaleDateString()}</p>
            </li>
          ))
        ) : (
          <p className="text-gray-500">Нет доступных событий.</p>
        )}
      </ul>
      <button
        onClick={() => navigate("/events")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        Посмотреть больше
      </button>
    </div>
  );
};

const Home = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [chartData1, setChartData1] = useState(null);
  const [chartData2, setChartData2] = useState(null);
  const [chartData3, setChartData3] = useState(null);
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState([]);

  const handleYearChange = (newYear) => setYear(newYear);

  const fetchData = async (year) => {
    setLoading(true);
    try {
      const urls = ["/api/statistics_1", "/api/statistics_2", "/api/statistics_3"];
      const responses = await Promise.all(urls.map((url) => fetch(`${url}?year=${year}`)));

      if (responses.some((res) => !res.ok)) {
        throw new Error("Ошибка при запросе данных");
      }

      const data = await Promise.all(responses.map((res) => res.json()));

      const formatData = (data) => ({
        labels: ["Прошли тест", "Не прошли тест"],
        datasets: [
          {
            label: "Количество",
            data: [data.passed[0], data.failed[0]],
            backgroundColor: ["rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
            borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
            borderWidth: 1,
          },
        ],
      });

      setChartData1(formatData(data[0]));
      setChartData2(formatData(data[1]));
      setChartData3(formatData(data[2]));
    } catch (error) {
      console.error("Ошибка при загрузке данных:", error);
      alert("Произошла ошибка при загрузке данных. Попробуйте позже.");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      if (!response.ok) {
        throw new Error("Ошибка при загрузке событий");
      }
      const data = await response.json();
      setEvents(data.events);
    } catch (error) {
      console.error("Ошибка при загрузке событий:", error);
    }
  };

  useEffect(() => {
    fetchData(year);
  }, [year]);

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-blue-700">Кабинет руководителя ОИВ</h1>
      <YearSelector onYearChange={handleYearChange} />
      <div className="mt-5">
        <p className="text-lg text-gray-700">Выбранный год: <strong>{year}</strong></p>
      </div>
      <ChartContainer chartData1={chartData1} chartData2={chartData2} chartData3={chartData3} loading={loading} />
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <EventsList events={events} />
      </div>
    </div>
  );
};

export default Home;
