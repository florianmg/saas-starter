interface IButton {
  label?: string;
  className?: string;
  onClick: () => void;
}
const Button: React.FC<IButton> = ({ label, className = '', onClick }) => {
  return (
    <div className={className}>
      <button onClick={onClick}>{label}</button>
    </div>
  );
};

export default Button;
