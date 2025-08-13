import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"; 

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/cartas">Cartas</Link></li>
        <li><Link to="/lectura">Lectura</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
}
