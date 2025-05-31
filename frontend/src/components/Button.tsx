type ButtonProps = {
  children: React.ReactNode;
  variant?: string;
  onClick?: () => void; // 👈 ajouter cette ligne
};

export const Button = ({
  children,
  variant = "primary",
  onClick,
}: ButtonProps) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};
