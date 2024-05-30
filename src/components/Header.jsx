import { useState } from "react";
import homeLogo from "../../images/logo-orange.png";
import profileImg from "../../images/profile-green.png";
import { useLocation } from "react-router-dom";

const SlideMenu = ({navNames}) => {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <aside className="slide-menu-container md:hidden fixed top-7 right-7">
      <label className="open-button z-10">
        <input type="checkbox" onClick={toggleDropdown} />
      </label>
      <div
        className={isOpen ? "slide-menu translate-x-[-150px]" : "slide-menu "}
      >
        <a className="hover:cursor-pointer ">
          <img src={profileImg} alt="profile Image" className="w-13 h-8" />
        </a>
        <ul className="grid grid-rows-4 my-6 h-[240px]">
        {navNames.map((name) => (
            <NavItem key={name} name={name} />
          ))}
        </ul>
      </div>
    </aside>
  );
};
const TopBar = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-baseline">
        <a href="/home" className="hover:cursor-pointer">
          <img src={homeLogo} alt="home logo" className="w-15 h-10" />
        </a>
        <a href="/home" className="hover:cursor-pointer">
          <h1 className="relative bottom-2 left-1 text-green-900 font-semibold">
            Quizzme
          </h1>
        </a>
      </div>
      <a className="hover:cursor-pointer hidden md:block">
        <img src={profileImg} alt="profile Image" className="w-13 h-8" />
      </a>
    </div>
  );
};

const NavItem = ({ name }) => {
  const location = useLocation();
  return (
    <li
      className={
        location.pathname === `/${name}` ? "active nav_item" : "nav_item "
      }
    >
      <a href={`/${name}`} >
        <span></span>
        {name.includes("_") ? name.replace("_", " ") : name}{" "}
        <hr className="nav_underline max-md:hidden" />
      </a>
    </li>
  );
};
const NavBar = () => {
  const navNames = ["Home", "MyQuizzes", "Quizz_me", "Performance"];

  return (
    <nav>
      <div className="mx-8 my-6 hidden md:block">
        <ul className="flex justify-around list-none font-medium text-gray-400">
          {navNames.map((name) => (
            <NavItem key={name} name={name} />
          ))}
        </ul>
        <hr className="h-[0.05em] bg-green-600 border-none" />
      </div>
      <SlideMenu navNames={navNames}/>
    </nav>
  );
};

const Header = () => {
  return (
    <header className="flex-col mx-14 my-7 flex-grow">
      <TopBar />
      <NavBar />
    </header>
  );
};

export default Header;
