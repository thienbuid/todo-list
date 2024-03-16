import React from "react";
import styles from "./button.module.scss";

interface Props {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset" | undefined;
  onClick?: () => void;
  style?: {};
}

const Button: React.FC<Props> = ({ type, children, onClick, style }) => {
  return (
    <button
      type={type}
      className={styles.button}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
