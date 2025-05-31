import React from "react";

interface CustomButtonProps {
  label: string;
  onClick?: (
    e: React.FormEvent<HTMLButtonElement> | React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
  asSubmit?: boolean; // ✅ nouvelle prop
}

const CostumerButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  asSubmit = false, // false par défaut
}) => {
  let btnClass = "btn ";

  switch (label.toLowerCase()) {
    case "veröffentlichen":
    case "einloggen":
    case "erstellen":
      btnClass += "btn-primary";
      break;

    case "abbrechen":
    case "annuler":
      btnClass += "btn-outline-secondary";
      break;

    case "löschen":
    case "supprimer":
      btnClass += "btn-danger";
      break;

    default:
      btnClass += "btn-secondary";
  }

  return (
    <button
      className={btnClass}
      type={asSubmit ? "submit" : "button"}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CostumerButton;
