import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="w-fit m-auto">
      <div className="w-[50px] h-[50px] border-4 border-r-whitesmoke border-b-whitesmoke border-l-whitesmoke rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
