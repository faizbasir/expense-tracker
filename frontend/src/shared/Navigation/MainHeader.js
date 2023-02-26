import React from "react";

const MainHeader = (props) => {
  return (
    <header className="bg-secondary flex justify-between mb-28">
      {props.children}
    </header>
  );
};

export default MainHeader;
