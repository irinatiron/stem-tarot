import { useEffect } from "react";
import styles from "./CursorTrail.module.css";

const colors = [
  "var(--pYellow)",
  "var(--sPink)",
  "var(--sPurple)",
  "var(--sLilac)"
];
export default function CursorTrail() {
  useEffect(() => {
    const trail = (e: MouseEvent) => {
  if (Math.random() > 0.3) return; 
  const star = document.createElement("div");
  star.className = styles.star;
  star.style.left = e.pageX + "px";
  star.style.top = e.pageY + "px";
  star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.appendChild(star);
  setTimeout(() => {
    star.remove();
  }, 1900); 
};
    document.addEventListener("mousemove", trail);
    return () => {
      document.removeEventListener("mousemove", trail);
    };
  }, []);
  return null;
}
