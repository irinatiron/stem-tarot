import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import styles from "./LandingPage.module.css";
import Line from "../components/Line";

export default function LandingPage() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = useState(false);

  const handleStart = () => {
    setLeaving(true);
    setTimeout(() => navigate("/cartas"), 1000);
  };

  const pageVariants = {
    initial: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(1000px)", scale: 0.9},
  };

  const pageTransition = { duration: 3, ease: "easeInOut" };

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          className="mainContainer"
          initial="initial"
          animate="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
        >
          <Line />
          <div className={styles.logoContainer}>
            <h1 className={styles.title}>Goddess Tarot</h1>
            <p className={styles.intro}>
              Conecta con el pasado, presente y futuro de la ciencia a través de
              las cartas del tarot y sus Diosas contemporáneas.
            </p>

            <button className={styles.button} onClick={handleStart}>
              Comenzar
              <div className={styles.button__horizontal}></div>
              <div className={styles.button__vertical}></div>
            </button>

            <div className={styles.starburstContainer}>
              <div className={styles.starburst}></div>
              <div className={styles.starburst2}></div>
              <div className={styles.starburst3}></div>
              <div className={styles.starburst2}></div>
              <div className={styles.starburst}></div>
              <div className={styles.starburst2}></div>
              <div className={styles.starburst3}></div>
              <div className={styles.starburst2}></div>
              <div className={styles.starburst}></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
