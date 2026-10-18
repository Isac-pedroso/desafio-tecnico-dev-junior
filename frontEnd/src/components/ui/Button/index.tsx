
import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

import "./style.css";

type ButtonProps = {
  texto: string;
  classe?: "primary" | "secondary" | "success" | "danger";
  icone?: ReactNode;
  onClick?: () => void;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

export default function Button({
  texto,
  classe = "primary",
  icone,
  onClick,
  type = "button",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`app-button app-button-${classe} ${className}`}
      {...props}
    >
      {icone && <span className="app-button-icon">{icone}</span>}
      <span>{texto}</span>
    </button>
  );
}
