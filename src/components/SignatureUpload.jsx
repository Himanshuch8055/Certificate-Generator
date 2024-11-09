const SignatureUpload = ({ signature, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Authorized Signature
      </label>
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onChange(e.target.files[0])}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        {signature && (
          <button
            onClick={() => onChange(null)}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default SignatureUpload; 