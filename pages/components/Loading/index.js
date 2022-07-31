import React from "react";
import Loader from "react-loader-spinner";

export const Loading = () => {
  return (
    <div className="loading">
      <Loader
        type="TailSpin"
        color="rgb(0, 153, 255)"
        height={100}
        width={100}
        timeout={3000}
      />
    </div>
  );
};
