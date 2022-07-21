import { useState } from "react";
import { NavLink, Link } from "react-router-dom";

export default function Navigation(props:any) {

  const [isActive, setIsActive] = useState(false)

    return (
      <>
            <div className="text-right">
      <button className="absolute top-5 right-20 text-right bg-lavender text-white px-5 py-1 rounded-xl drop-shadow-md"><Link to="/" data-testid="Projects"> Se connecter </Link></button>
      </div>
      <img src="/icons/HakunaLogo.png" alt="logo" className="fixed w-40"/>
      <nav className="bg-transparent  border-l-8 border-lavender h-screen flex flex-col justify-center fixed">
        <ul>
          <li  className="bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20">
            <NavLink to="/home" data-testid="Home">
              <img src="/icons/home.svg" alt="" />
            </NavLink>
          </li>
          <li className="bg-lavender rounded-3xl -ml-4 flex justify-end pr-3 py-1 px-5 mb-20">
            <NavLink to="/projects" data-testid="Projects">
              <img src="/icons/projects.svg" alt="" />
            </NavLink>
          </li>
        </ul>
      </nav>
      </>
    );
  }
  