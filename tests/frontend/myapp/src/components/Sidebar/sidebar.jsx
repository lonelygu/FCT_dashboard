import { Link } from "react-router-dom";
import { useState } from "react";
import AutoCompleteSearch from "../AutoCompleteSearch/AutoCompleteSearch"; // Подключаем новый компонент

function Sidebar() {
  const [monitoringOpen, setMonitoringOpen] = useState(false);
  const [analysisOpen, setAnalysisOpen] = useState(false);
  const [admissionOpen, setAdmissionOpen] = useState(false);

  const toggleMonitoring = () => setMonitoringOpen(!monitoringOpen);
  const toggleAnalysis = () => setAnalysisOpen(!analysisOpen);
  const toggleAdmission = () => setAdmissionOpen(!admissionOpen);

  return (
    <div className="w-64 bg-customBlue text-white h-screen p-5">
      <h1 className="text-xl font-bold mb-4">Федеральный уровень</h1>

      {/* Интеграция поля поиска с автозаполнением */}
      <AutoCompleteSearch />

      <nav className="space-y-2 mt-5">
        <ul className="space-y-2">
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/">Главная</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/map">Карта</Link></li>

          {/* Мониторинг с раскрытием/сворачиванием */}
          <li className="block p-2 hover:bg-gray-700 rounded">
            <span
              className="flex items-center cursor-pointer"
              onClick={toggleMonitoring}
            >
              <span>Мониторинг</span>
              <span className={`ml-2 transform transition-transform ${monitoringOpen ? 'rotate-90' : ''}`}>
                ➤
              </span>
            </span>
            {monitoringOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/monitoring/planning">Планирование ГИА</Link></li>
                <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/monitoring/training">Обучение специалистов ППЭ ЕГЭ</Link></li>
                <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/monitoring/reporting">Отчетность региональных СПО</Link></li>
              </ul>
            )}
          </li>

          {/* Аналитика с раскрытием/сворачиванием */}
          <li className="block p-2 hover:bg-gray-700 rounded">
            <span
              className="flex items-center cursor-pointer"
              onClick={toggleAnalysis}
            >
              <span>Аналитика</span>
              <span className={`ml-2 transform transition-transform ${analysisOpen ? 'rotate-90' : ''}`}>
                ➤
              </span>
            </span>
            {analysisOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/analysis/giа-11">Аналитика ГИА-11</Link></li>
                <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/analysis/giа-9">Аналитика ГИА-9</Link></li>
              </ul>
            )}
          </li>

          {/* Поступление с раскрытием/сворачиванием */}
          <li className="block p-2 hover:bg-gray-700 rounded">
            <span
              className="flex items-center cursor-pointer"
              onClick={toggleAdmission}
            >
              <span>Поступление</span>
              <span className={`ml-2 transform transition-transform ${admissionOpen ? 'rotate-90' : ''}`}>
                ➤
              </span>
            </span>
            {admissionOpen && (
              <ul className="ml-4 mt-2 space-y-2">
                <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/admission/vtg-11">Поступление ВТГ-11</Link></li>
                <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/admission/vtg-9">Поступление ВТГ-9</Link></li>
              </ul>
            )}
          </li>

          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/survey">Анкетирование</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/support">Техподдержка</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/docs">Документация</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/contact">Контакты</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/test">test</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
