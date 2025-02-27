import { Button } from "../ui/button"; // для Header компонента
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg"; // Путь к логотипу, если он в папке src/assets

function Header({ user }) {
  return (
    <header className="flex bg-customBlue justify-between items-center p-4 shadow-md">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10" /> {/* Измените размер по своему усмотрению */}
        <span className="text-xl font-bold text-white">ФЦТ</span>
      </Link>
      <div className="flex items-center gap-4">
        <span className="text-white">{user?.id}</span>
        <Button className="text-white bg-customBlue border-2 border-grey-600">Выход</Button>
      </div>
    </header>
  );
}

export default Header;
