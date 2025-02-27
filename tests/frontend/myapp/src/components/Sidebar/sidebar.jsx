import { Link } from "react-router-dom";
import { Button } from "../ui/button"; // Используйте относительный путь
import AutoCompleteSearch from "../AutoCompleteSearch/AutoCompleteSearch"; // Подключаем новый компонент

function Sidebar() {
  return (
    <div className="w-64 bg-customBlue text-white h-screen p-5">
      <h1 className="text-xl font-bold mb-4">Федеральный уровень</h1>

      {/* Интеграция поля поиска с автозаполнением */}
      <AutoCompleteSearch />

      <nav className="space-y-2 mt-5">
        <ul className="space-y-2">
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/">Главная</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/map">Карта</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/monitoring">Мониторинг</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/analysis">Результаты ГИА</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/admission">Поступление</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/calendar">Календарь</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/survey">Анкетирование</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/support">Техподдержка</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/docs">Документация</Link></li>
          <li><Link className="block p-2 hover:bg-gray-700 rounded" to="/contact">Контакты</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
