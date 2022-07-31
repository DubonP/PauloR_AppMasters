import styles from "../../../styles/Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.Loading}>
      <image src="Spinner.svg" alt="loading" />
    </div>
  );
};
