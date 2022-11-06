interface IInput {
  label?: string;
  id: string;
  type?: 'string' | 'password';
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (newValue: string) => void;
}
const Input: React.FC<IInput> = ({
  label,
  id,
  type = 'string',
  placeholder = '',
  className = '',
  value,
  onChange,
}) => {
  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) =>
    onChange(event.currentTarget.value);

  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default Input;
