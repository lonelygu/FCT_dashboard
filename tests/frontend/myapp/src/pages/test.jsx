import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const FiveSegmentPieChart = () => {
  const pieData = {
    labels: [
      "ППЭ с использованием технологии печати ЭМ",
      "ППЭ с использованием бумажной технологии",
      "ППЭ на дому",
      "ППЭ в больницах",
      "ППЭ на базе ГУ ФСИН"
    ],
    datasets: [
      {
        label: "Распределение данных",
        data: [3393, 87, 81, 12, 13],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className="p-5 flex justify-center items-center"> {/* Центрируем диаграмму */}
      <div className="relative w-[512px] h-[512px]"> {/* Задаем фиксированный размер */}
        <h2 className="text-xl font-semibold text-center mb-4">
          Диаграмма с 5 секторами
        </h2>
        <Pie
          data={pieData}
          options={{
            responsive: true,
            maintainAspectRatio: false, // Позволяет диаграмме занять всю высоту контейнера
            plugins: {
              legend: {
                position: "top"
              },
              tooltip: {
                enabled: true
              }
            }
          }}
        />
      </div>
    </div>
  );
};

export default FiveSegmentPieChart;
