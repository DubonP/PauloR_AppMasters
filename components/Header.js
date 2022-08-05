import Link from "next/link";
import styles from "../styles/Header.module.css";
import Image from "next/image";

export const Header = () => {
  return (
    <header className={styles.All_header}>
      <div className={styles.header_logo}>
        <div className={styles.header_logo_img}>
          <Image src="/images/heart.png" layout="fill" alt="Background" />
        </div>
        <Link href="/">
          <h1>Doação de computadores</h1>
        </Link>
      </div>
      <div className={styles.Buttons}>
        <Link href="/">
          <span className={styles.Button}>Home</span>
        </Link>
        <Link href="/instituicoes">
          <span href="/" className={styles.Button}>
            instituições
          </span>
        </Link>
      </div>
    </header>
  );
};
