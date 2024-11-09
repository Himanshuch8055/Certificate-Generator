const Input = ({
  label,
  error,
  className = "",
  disabled = false,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          appearance-none block w-full px-3 py-2
          border border-gray-300 rounded-md shadow-sm
          placeholder-gray-400
          focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
          sm:text-sm
          ${disabled ? 'bg-gray-50 cursor-not-allowed' : ''}
          ${error ? 'border-red-300' : ''}
          ${className}
        `}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input; 