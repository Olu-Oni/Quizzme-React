import { useEffect, useState } from "react";
import homeLogo from "../../images/logo-orange.png";
import profileImg from "../../images/profile-green.png";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Popover, Typography } from "@mui/material";
import { useAuth } from "../pages/main/Login";

const SlideMenu = ({ navNames, dropDown, userId }) => {
  const { isOpen, setIsOpen } = dropDown;
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const { logOut } = useAuth();
  
  useEffect(() => setIsOpen(false), []);
  return (
    <aside className="fixed z-10 slide-menu-container md:hidden top-7 right-7">
      <label
        className={
          isOpen
            ? "open-button close-button z-20 bg-[#f7f7f7]"
            : "open-button z-20 bg-[#f7f7f7]"
        }
      >
        <input type="checkbox" checked={isOpen} onChange={toggleDropdown} />
      </label>
      <div
        className={isOpen ? "slide-menu translate-x-[-150px]" : "slide-menu "}
      >
        <a className="hover:cursor-pointer">
          <img src={profileImg} alt="profile Image" className="h-8 mb-3 w-13" />
          <h1 >Welcome, {userId}
            </h1>
        </a>
        <ul className="flex flex-col gap-6 mt-6 h-fit">
          {navNames.map((name) => (
            <NavItem key={name} name={name} />
          ))}
          <li className="py-2 text-center border-t rounded-b-xl hover:backdrop-brightness-95">
            <button onClick={logOut}>Logout
              </button></li>
        </ul>
      </div>
    </aside>
  );
};
const TopBar = ({ userId }) => {
  const { logOut } = useAuth();
  // popover stuff
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Calculate open state from anchorEl
  const open = Boolean(anchorEl);
  const id = open ? "profile-popover" : undefined;
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
      <span className="items-end hidden gap-4 pb-4 hover:cursor-pointer md:flex">
        Welcome, {userId}
        <button id={id} onClick={handleClick}>
          <img src={profileImg} alt="profile Image" className="h-8 w-13" />
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{ marginTop: 2 }}
        >
          <Typography sx={{ p: 2 }}>
            <button onClick={logOut}>Logout</button>
          </Typography>
        </Popover>
      </span>
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
const NavBar = ({ dropDown, userId }) => {
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
      <SlideMenu userId={userId} navNames={navNames} dropDown={dropDown} />
    </nav>
  );
};

const Header = ({ dropDown }) => {
  const userId = localStorage.getItem("userId");
  const parsedUserId = userId ? JSON.parse(userId) : null;

  return (
    <>
      <header className="baloo flex-col  my-7 px-5 md:px-[5%]">
        <TopBar userId={parsedUserId} />
        <NavBar userId={parsedUserId} dropDown={dropDown} />
      </header>
      <Outlet />
    </>
  );
};

export default Header;
