// import Link from "next/link";
import { useContext, useEffect, useState } from "react";
// import AnimatedLink from "./AnimatedLink";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import LanguageDopdown from "./LanguageDopdown";
// import { Button, Dropdown, Menu } from "antd";
// import { DownOutlined } from "@ant-design/icons";
import ButtonLoginSignUp from "./Buttons/ButtonLoginSignUp";
// import { UserOutlined } from '@ant-design/icons';
import ButtonAfterLogin from "./Buttons/BuutonAfterLogin";
import { AuthContext } from "../Context/AuthProvider";
import Headroom from "react-headroom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import logo from "../../../../public/img/Untitled-3.svg";

const Navbar = () => {
  const { user, userRole, handleLogout } = useContext(AuthContext);
  const { t } = useTranslation("home");
  const currentLanguage = i18next.language;
  const [open, setOpen] = useState(false);

  const navLinks = [
    { title: t("home"), href: "/" },
    { title: t("roomSearch"), href: "/roomSearch" },
    { title: t("Restaurant & Cafe"), href: "/cafe" },
    { title: t("Banquet & Meeting"), href: "/banquet" },
    { title: t("fullaccess"), href: "/fullaccess" },
    { title: t("about"), href: "/about" },
    //{ title: t("contact"), href: "/contact" },
  ];

  
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  

  return (
    <Headroom
      className=""
      pinStart={50}
      disableInlineStyles={false}
      upTolerance={10}
      downTolerance={10}
      style={{ transition: "all .5s ease-in-out", backgroundColor: "#1C1C1D", zIndex: 1000 }}
    >
      <nav className="max-w-7xl mx-auto">
        <div className={` flex items-center justify-between  px-2 ${currentLanguage === "ar" ? "body-ar font-normal  " : "body-en "}`}>
          <Link to={"/"} className=" flex items-center justify-center gap-[1ch]">
            {/* <Link to={"/"} className=" text-sm md:text-xl  "> */}
            {/* {t("Awalive Hotel")} */}
            <img src={logo} alt="awalive-hotel-logo" className="h-20 max-w-40 " />
            {/* </Link> */}
          </Link>
          <div className="lg:flex hidden    text-xs tracking-wider text-zinc-400">
            <NavLink to={"/"} className={({ isActive }) => (isActive ? " text-white py-8 lg:py-6 px-4" : "py-8 lg:py-6 px-4 ")}>
              {t("home")}
            </NavLink>

            <NavLink
              to={"/roomSearch"}
              className={({ isActive }) =>
                isActive ? " text-white py-8 lg:py-6 px-4" : "hover:text-white transition duration-200 ease-in-out py-8 lg:py-6 px-4"
              }
            >
              {t("search")}
            </NavLink>

            <NavLink
              to={"/cafe"}
              className={({ isActive }) =>
                isActive ? " text-white py-8 lg:py-6 px-4" : "hover:text-white transition duration-200 ease-in-out py-8 lg:py-6 px-4"
              }
            >
              {t("restaurants")}
            </NavLink>

            <NavLink
              to={"/banquet"}
              className={({ isActive }) =>
                isActive ? " text-white py-8 lg:py-6 px-4" : "hover:text-white transition duration-200 ease-in-out py-8 lg:py-6 px-4"
              }
            >
              {t("Banquet & Meeting")}
            </NavLink>

            <NavLink
              to={"/fullaccess"}
              className={({ isActive }) =>
                isActive ? " text-white py-8 lg:py-6 px-4" : "hover:text-white transition duration-200 ease-in-out py-8 lg:py-6 px-4"
              }
            >
              {t("fullaccess")}
            </NavLink>

            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                isActive ? " text-white py-8 lg:py-6 px-4" : "hover:text-white transition duration-200 ease-in-out py-8 lg:py-6 px-4"
              }
            >
              {t("about")}
            </NavLink>

            {/* <NavLink to={"/contact"} className={({ isActive }) => (isActive ? " text-white py-8 lg:py-6 px-4" : " hover:text-white transition duration-200 ease-in-out py-8 lg:py-6 px-4")}>
              {t("contact")}
               <AnimatedLink title={"Home"} /> 
            </NavLink>*/}

            {user?.role === "admin" && (
              <Link to={"/dashboard"} className={"py-8 lg:py-6 px-4"}>
                {t("Dashboard")}
              </Link>
            )}

            <div className="py-8 lg:py-6">
              <Link
                to={"/roomSearch"}
                className="bg-white px-3 py-1 text-black  text-[12px] font-semibold tracking-[0.2rem] cursor-pointer hover:bg-[#BE9874] hover:text-white "
              >
                {t("BOOK NOW")}
              </Link>
            </div>
          </div>

          {/* for mobile version  */}
          <div className="lg:hidden flex gap-2 items-center">
            <div className="lg:hidden">
              <LanguageDopdown />
            </div>
            {/* mobile login button todo to solve  */}
            <div className="lg:hidden">
              {user?.fullName ? <ButtonAfterLogin userName={user?.fullName} handleLogout={handleLogout} /> : <ButtonLoginSignUp />}
              {/* mobile login button todo to solve  */}
            </div>
            <div className="cursor-pointer lg:hidden text-md text-white" onClick={toggleMenu}>
              {t("menu")}
            </div>
          </div>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-screen origin-top bg-[#BE9874] text-black p-10 z-50"
          >
            <div className="flex h-full flex-col">
              <div className="flex justify-between">
                <h1 className="text-lg text-black">Awaliv Hotel</h1>
                <p className="cursor-pointer text-md text-black" onClick={toggleMenu}>
                  {t("Close")}
                </p>
              </div>
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-lora items-center gap-4 "
              >
                {navLinks.map((link, index) => {
                  return (
                    <div className="overflow-hidden" key={index}>
                      <MobileNavLink title={link.title} href={link.href} nestedLinks={link.nestedLinks} onClick={toggleMenu} />
                    </div>
                  );
                })}
              </motion.div>
              <div className="flex items-center justify-between"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Headroom>
  );
};

export default Navbar;
const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};
const MobileNavLink = ({ title, href, onClick, nestedLinks }) => {
  const [isNestedVisible, setIsNestedVisible] = useState(false);

  const handleToggleNested = () => {
    setIsNestedVisible((prev) => !prev);
  };

  return (
    <motion.div variants={mobileLinkVars} className="text-2xl uppercase text-black">
      <div onClick={handleToggleNested}>
        <Link to={href} onClick={onClick}>
          {title}
        </Link>
      </div>
      {isNestedVisible && nestedLinks && (
        <ul className="ml-4">
          {nestedLinks.map((nestedLink, index) => (
            <li key={index}>
              <NavLink
                to={nestedLink.href}
                onClick={onClick}
                className={({ isActive }) => (isActive ? "font-semibold text-[#BE9874]" : "font-medium")}
              >
                {nestedLink.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
};
