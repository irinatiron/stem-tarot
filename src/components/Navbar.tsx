import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      {/* Botón hamburguesa */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      {/* Menú */}
      <ul className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <li>
          <NavLink 
            to="/" 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => isActive ? styles.activeLink : ""}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/cartas" 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => isActive ? styles.activeLink : ""}
          >
            Cartas
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/lectura" 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => isActive ? styles.activeLink : ""}
          >
            Lectura
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/info" 
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => isActive ? styles.activeLink : ""}
          >
            Acerca de
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
