import styles from "../styles/Loading.module.css";
import SyncLoader from "react-spinners/SyncLoader";

/* loading spiner criado como componente para ser usado em outras paginas do site */

export const Loading = () => {
  return (
    <div className={styles.Loading}>
      <SyncLoader loading margin={5} size={17} color="rgb(10, 182, 255)" />
    </div>
  );
};
