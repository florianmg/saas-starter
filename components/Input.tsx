import cn from 'classnames';

interface IInput {
  label?: string;
  id: string;
  type?: 'string' | 'password';
  placeholder?: string;
  className?: string;
  value: string;
  error?: string;
  onChange: (newValue: string) => void;
}
const Input: React.FC<IInput> = ({
  label,
  id,
  type = 'string',
  placeholder = '',
  className = '',
  error,
  value,
  onChange,
}) => {
  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) =>
    onChange(event.currentTarget.value);

  return (
    <div className={className}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        className={cn('w-full border', {
          'border-red-500': !!error,
        })}
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
