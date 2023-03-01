import React from "react";
import { TypeAnimation } from "react-type-animation";

const LoginPageAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        "Want to start managing your money better?",
        1000,
        "Start tracking your spending with us today!",
        1000,
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      deletionSpeed={70}
      style={{ fontSize: "2rem", color: "white", textAlign: "center" }}
    />
  );
};

export default LoginPageAnimation;
