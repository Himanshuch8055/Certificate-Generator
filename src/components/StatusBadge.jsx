import { format } from 'date-fns';

const StatusBadge = ({ status, expirationDate }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'valid':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          label: 'Valid'
        };
      case 'expired':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          label: 'Expired'
        };
      case 'revoked':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          label: 'Revoked'
        };
      default:
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          label: 'Pending'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="inline-flex flex-col items-center">
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
      {expirationDate && (
        <span className="mt-1 text-xs text-gray-500">
          Expires: {format(new Date(expirationDate), 'MMM dd, yyyy')}
        </span>
      )}
    </div>
  );
};

export default StatusBadge; 