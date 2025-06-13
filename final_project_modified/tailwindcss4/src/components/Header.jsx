import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/asserts';
import { Link } from "react-router-dom";
import GSAPcomponent from './GSAPcomponent';
import axios from "axios";
import config from '../urlConfig.js';

const Header = () => {
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(window.innerWidth < 1024);
  const collapseHeaderItemsRef = useRef(null);
  const collapseBtnRef = useRef(null);

  const RESPONSIVE_WIDTH = 1024;

  const onHeaderClickOutside = (e) => {
    if (
      collapseHeaderItemsRef.current &&
      !collapseHeaderItemsRef.current.contains(e.target) && 
      collapseBtnRef.current && 
      !collapseBtnRef.current.contains(e.target) // Prevent closing when clicking the button
    ) {
      setIsHeaderCollapsed(true);
    }
  };
  useEffect(() => {
    if (!isHeaderCollapsed) {
      document.addEventListener("click", onHeaderClickOutside);
    } else {
      document.removeEventListener("click", onHeaderClickOutside);
    }
  
    return () => document.removeEventListener("click", onHeaderClickOutside);
  }, [isHeaderCollapsed]);
  

  const toggleHeader = () => {
    if (isHeaderCollapsed) {
      if (collapseHeaderItemsRef.current) {
        collapseHeaderItemsRef.current.classList.add("opacity-100");
        collapseHeaderItemsRef.current.style.width = "60vw";
      }
      if (collapseBtnRef.current) {
        collapseBtnRef.current.classList.remove("bi-list");
        collapseBtnRef.current.classList.add("bi-x");
      }
    } else {
      if (collapseHeaderItemsRef.current) {
        collapseHeaderItemsRef.current.classList.remove("opacity-100");
        collapseHeaderItemsRef.current.style.width = "0vw";
      }
      if (collapseBtnRef.current) {
        collapseBtnRef.current.classList.remove("bi-x");
        collapseBtnRef.current.classList.add("bi-list");
      }
    }
    setIsHeaderCollapsed(!isHeaderCollapsed); // Toggle state
  };
  
  const responsive = () => {
    if (window.innerWidth > RESPONSIVE_WIDTH) {
      if (collapseHeaderItemsRef.current) {
        collapseHeaderItemsRef.current.style.width = "";
      }
      if (!isHeaderCollapsed) {
        if (collapseHeaderItemsRef.current) {
          collapseHeaderItemsRef.current.classList.remove("opacity-100");
        }
        if (collapseBtnRef.current) {
          collapseBtnRef.current.classList.remove("bi-x");
          collapseBtnRef.current.classList.add("bi-list");
        }
        setIsHeaderCollapsed(true);
        window.removeEventListener("click", onHeaderClickOutside);
      }
    } else {
      setIsHeaderCollapsed(true);
      if (collapseHeaderItemsRef.current && collapseHeaderItemsRef.current.classList.contains("opacity-100")) {
        collapseHeaderItemsRef.current.classList.remove("opacity-100");
        collapseHeaderItemsRef.current.style.width = "0vw";
        if (collapseBtnRef.current) {
          collapseBtnRef.current.classList.remove("bi-x");
          collapseBtnRef.current.classList.add("bi-list");
        }
        window.removeEventListener("click", onHeaderClickOutside);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", responsive);
    return () => window.removeEventListener("resize", responsive);
  }, []);

  useEffect(() => {
    setIsHeaderCollapsed(window.innerWidth < RESPONSIVE_WIDTH);
  }, []);

  return (
    <>
    <GSAPcomponent />
    <header
      className="max-w-lg:px-4 max-w-lg:mr-auto absolute top-0 z-20 flex h-[60px] w-full bg-opacity-0 px-[5%] lg:justify-around"
    >
      <a className="h-[50px] w-[70px] p-[4px]" href="/">
        <img
          src={assets.logo}
          alt="logo"
          className="object h-full w-full"
        />
      </a>
      <div
        className="collapsible-header animated-collapse max-lg:shadow-md"
        id="collapsed-header-items"
        ref={collapseHeaderItemsRef}
      >
        <div
          className="flex h-full w-max gap-5 text-base max-lg:mt-[30px] max-lg:flex-col max-lg:place-items-end max-lg:gap-5 lg:mx-auto lg:place-items-center"
        >
          <a className="header-links" href="/"> Home </a>
          <a className="header-links" href="/#Aboutus"> About us </a>
          <a className="header-links" href="/#Contactus"> Contact us </a>
          <a className="header-links" href="/profile"> Profile </a>
        </div>
      </div>
      <button
  className={`bi ${isHeaderCollapsed ? "bi-list absolute" : "bi-x fixed"} right-3 top-3 z-50 text-3xl text-white lg:hidden`}
  onClick={toggleHeader}
  aria-label="menu"
  id="collapse-btn"
  ref={collapseBtnRef}
></button>


    </header>
    </>
  );
};

export default Header;