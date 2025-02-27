import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './styles.css';

// Асинхронно загружаем компоненты
const Sidebar = lazy(() => import("./components/Sidebar/sidebar"));
const Header = lazy(() => import("./components/Header/header"));
const Home = lazy(() => import("./pages/home"));

const App = () => {
  const user = { id: "User123" };

  return (
    <Router>
      <div className="flex h-screen">
        {/* Оборачиваем Sidebar в Suspense */}
        <Suspense fallback={<div>Загрузка Sidebar...</div>}>
          <Sidebar />
        </Suspense>
        <div className="flex flex-col flex-1">
          {/* Оборачиваем Header в Suspense */}
          <Suspense fallback={<div>Загрузка Header...</div>}>
            <Header user={user} />
          </Suspense>
          <div className="flex-1 p-5 overflow-auto">
            {/* Оборачиваем Routes в Suspense */}
            <Suspense fallback={<div>Загрузка страницы...</div>}>
              <Routes>
                <Route path="/" element={<Home />} /> {/* Home — это асинхронный компонент */}
                <Route path="/map" element={<h1 className="text-2xl">Карта</h1>} />
                <Route path="/monitoring" element={<h1 className="text-2xl">Мониторинг</h1>} />
                <Route path="/analysis" element={<h1 className="text-2xl">Результаты ГИА</h1>} />
                <Route path="/admission" element={<h1 className="text-2xl">Поступление</h1>} />
                <Route path="/calendar" element={<h1 className="text-2xl">Календарь</h1>} />
                <Route path="/survey" element={<h1 className="text-2xl">Анкетирование</h1>} />
                <Route path="/support" element={<h1 className="text-2xl">Техподдержка</h1>} />
                <Route path="/docs" element={<h1 className="text-2xl">Документация</h1>} />
                <Route path="/contact" element={<h1 className="text-2xl">Контакты</h1>} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
