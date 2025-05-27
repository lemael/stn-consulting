import React from "react";

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const CostumerButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  type = "button",
}) => {
  let btnClass = "btn ";

  switch (label.toLowerCase()) {
    case "veröffentlichen":
    case "publier":
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
    <button className={btnClass} onClick={onClick} type={type}>
      {label}
    </button>
  );
};

export default CostumerButton;
