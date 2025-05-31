// Logo.tsx
const Logo = ({
  width = 50,
  height = 50,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <img
      src="/logo.png"
      alt="Logo"
      style={{ width, height, borderRadius: "8px" }}
    />
  );
};
export default Logo;
