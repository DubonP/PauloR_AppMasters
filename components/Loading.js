import styles from "../styles/Loading.module.css";

/* loading spiner criado como componente para ser usado em outras paginas do site */

export const Loading = () => {
  return (
    <div className={styles.Loading}>
      <image src="Spinner.svg" alt="loading" />
    </div>
  );
};
