import Link from "next/link";
import styles from "../styles/Header.module.css";
import instituicoes from "../pages/instituicoes.js";

export const Header = () => {
  return (
    <div className={styles.All_header}>
      <header>
        <h1>Doação de computadores</h1>
      </header>
      <div className={styles.Buttons}>
        <Link href="/">
          <button className={styles.Button}>Home</button>
        </Link>
        <Link href="/instituicoes">
          <button href="/" className={styles.Button}>
            instituições
          </button>
        </Link>
      </div>
    </div>
  );
};
