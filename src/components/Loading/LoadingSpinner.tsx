import React from "react";
import styles from "./loading.module.css";

function LoadingSpinner() {
  return (
    <div className={styles["loading-spinner-container"]}>
      <div className={styles["loading-spinner"]}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
