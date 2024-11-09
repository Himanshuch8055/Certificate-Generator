import { useState } from 'react';
import { format, addMonths, addYears } from 'date-fns';

const ExpirationManager = ({ onExpirationSet }) => {
  const [expirationType, setExpirationType] = useState('never');
  const [customDate, setCustomDate] = useState('');

  const handleExpirationChange = (type) => {
    setExpirationType(type);
    let expirationDate = null;

    switch (type) {
      case '6months':
        expirationDate = addMonths(new Date(), 6);
        break;
      case '1year':
        expirationDate = addYears(new Date(), 1);
        break;
      case '2years':
        expirationDate = addYears(new Date(), 2);
        break;
      case 'custom':
        expirationDate = new Date(customDate);
        break;
      default:
        expirationDate = null;
    }

    onExpirationSet(expirationDate);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Certificate Expiration</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <button
          onClick={() => handleExpirationChange('never')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            expirationType === 'never'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Never Expires
        </button>
        <button
          onClick={() => handleExpirationChange('6months')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            expirationType === '6months'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          6 Months
        </button>
        <button
          onClick={() => handleExpirationChange('1year')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            expirationType === '1year'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          1 Year
        </button>
        <button
          onClick={() => handleExpirationChange('2years')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            expirationType === '2years'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          2 Years
        </button>
      </div>

      {/* Custom Date Option */}
      <div className="flex items-center space-x-4">
        <input
          type="date"
          value={customDate}
          onChange={(e) => {
            setCustomDate(e.target.value);
            if (expirationType === 'custom') {
              handleExpirationChange('custom');
            }
          }}
          min={format(new Date(), 'yyyy-MM-dd')}
          className="px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          onClick={() => handleExpirationChange('custom')}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            expirationType === 'custom'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Custom Date
        </button>
      </div>
    </div>
  );
};

export default ExpirationManager; 