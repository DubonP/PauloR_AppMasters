import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "../../../styles/Loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.Loading}>
      <ClipLoader color="rgb(0, 0, 0)" loading size={150} />
    </div>
  );
};
