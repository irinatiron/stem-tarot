import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"; 

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/cards">Cartas</Link></li>
        <li><Link to="/read">Lectura</Link></li>
        <li><Link to="/about">Contacto</Link></li>
      </ul>
    </nav>
  );
}
