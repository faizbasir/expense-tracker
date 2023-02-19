import React from "react";

const MainHeader = (props) => {
  return (
    <header className="bg-secondary flex justify-between mb-20">
      {props.children}
    </header>
  );
};

export default MainHeader;
