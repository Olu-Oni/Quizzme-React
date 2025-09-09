import { useEffect, useState } from "react";
import homeLogo from "../../images/logo-orange.png";
import profileImg from "../../images/profile-green.png";
import { Link, Outlet, useLocation } from "react-router-dom";

const SlideMenu = ({ navNames,dropDown, userId }) => {
  const {isOpen, setIsOpen} = dropDown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => setIsOpen(false), []);
  return (
    <aside className="fixed z-10 slide-menu-container md:hidden top-7 right-7">
      
      <label className={isOpen?"open-button close-button z-20 bg-[#f7f7f7]":"open-button z-20 bg-[#f7f7f7]"}>
        
        <input type="checkbox" checked={isOpen} onChange={toggleDropdown} />
      </label>
      <div
        className={isOpen ? "slide-menu translate-x-[-150px]" : "slide-menu "}
      >
        <a className="hover:cursor-pointer">
          <img src={profileImg} alt="profile Image" className="h-8 mb-2 w-13" />
           Welcome, {userId}
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
const TopBar = ({userId}) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-baseline">
        <a href="/home" className="hover:cursor-pointer">
          <img src={homeLogo} alt="home logo" className="h-10 w-15" />
        </a>
        <a href="/home" className="hover:cursor-pointer">
          <h1 className="relative text-green-900 bottom-2 left-1 ">Quizzme</h1>
        </a>
      </div>
      <a className="items-end hidden gap-4 pb-4 hover:cursor-pointer md:flex">
         Welcome, {userId}
        <img src={profileImg} alt="profile Image" className="h-8 w-13" />
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
const NavBar = ({dropDown, userId}) => {
  const navNames = ["Home", "MyQuizzes", "Quizz_me", "Performance"];

  return (
    <nav className="mx-8 mt-6 ">
      <div className="hidden md:block">
        <ul className="flex justify-around font-medium text-gray-400 list-none">
          {navNames.map((name) => (
            <NavItem key={name} name={name} />
          ))}
        </ul>
      </div>
      <hr className="h-[0.05em] bg-green-600 border-none max-md:absolute max-md:w-dvw left-0" />
      <SlideMenu userId={userId} navNames={navNames}  dropDown={dropDown}/>
    </nav>
  );
};

const Header = ({dropDown}) => {
   const userId = localStorage.getItem("userId");
  const parsedUserId = userId ? JSON.parse(userId) : null;

  return (
    <>
    <header className="baloo flex-col  my-7 px-5 md:px-[5%]">
      <TopBar userId={parsedUserId} />
      <NavBar userId={parsedUserId} dropDown={dropDown}/>
    </header>
    <Outlet/>
    </>
  );
};

export default Header;
