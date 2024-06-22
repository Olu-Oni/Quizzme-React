import { useEffect, useState } from "react";
import homeLogo from "../../images/logo-orange.png";
import profileImg from "../../images/profile-green.png";
import { Link, Outlet, useLocation } from "react-router-dom";

const SlideMenu = ({ navNames,dropDown }) => {
  const {isOpen, setIsOpen} = dropDown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => setIsOpen(false), []);
  return (
    <aside className="slide-menu-container md:hidden fixed top-7 right-7 z-10">
      <label className={isOpen?"open-button close-button z-20 bg-[#f7f7f7]":"open-button z-20 bg-[#f7f7f7]"}>
        <input type="checkbox" checked={isOpen} onChange={toggleDropdown} />
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
          <h1 className="relative bottom-2 left-1 text-green-900 ">Quizzme</h1>
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
      <Link to={`/${name}`}>
        <span></span>
        {name.includes("_") ? name.replace("_", " ") : name}{" "}
        <hr className="nav_underline max-md:hidden" />
      </Link>
    </li>
  );
};
const NavBar = ({dropDown}) => {
  const navNames = ["Home", "MyQuizzes", "Quizz_me", "Performance"];

  return (
    <nav className="mx-8 mt-6 ">
      <div className="hidden md:block">
        <ul className="flex justify-around list-none font-medium text-gray-400">
          {navNames.map((name) => (
            <NavItem key={name} name={name} />
          ))}
        </ul>
      </div>
      <hr className="h-[0.05em] bg-green-600 border-none max-md:absolute max-md:w-dvw left-0" />
      <SlideMenu navNames={navNames}  dropDown={dropDown}/>
    </nav>
  );
};

const Header = ({dropDown}) => {
  return (
    <>
    <header className="baloo flex-col  my-7 px-5 md:px-[5%]">
      <TopBar />
      <NavBar dropDown={dropDown}/>
    </header>
    <Outlet/>
    </>
  );
};

export default Header;
