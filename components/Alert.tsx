import cn from 'classnames';

interface IAlert {
  message: string[];
  type: 'error' | 'warning' | 'info';
}

const Alert: React.FC<IAlert> = ({ message, type }) => (
  <div
    className={cn(' rounded-md p-3', {
      'bg-red-100': type === 'error',
      'bg-yellow-100': type === 'warning',
      'bg-blue-100': type === 'info',
    })}
  >
    {message.map((error) => (
      <p
        className={cn({
          'text-red-900': type === 'error',
          'text-yellow-800': type === 'warning',
          'text-blue-900': type === 'info',
        })}
      >
        {error}
      </p>
    ))}
  </div>
);

export default Alert;
