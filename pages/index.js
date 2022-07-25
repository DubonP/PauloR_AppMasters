import Head from "next/head";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const data = await fetch(`https://doar-computador-api.herokuapp.com/`);
  const status = await data.json();
  return {
    props: { status },
  };
}

export default function Home({ status }) {
  return (
    <div>
      <Head>
        <title>Paulo Rossi App Masters</title>
      </Head>
      <main className={styles.All_Home}>
        <h1>Doação de computadores usados</h1>
        {status.alive ? (
          <p className={styles.API_online}>API Online</p>
        ) : (
          <p className={styles.API_offline}>API Offline</p>
        )}
      </main>
    </div>
  );
}
