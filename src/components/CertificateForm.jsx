import { useCallback } from 'react';
import Input from './ui/Input';
import SignatureUpload from './SignatureUpload';
import LogoUpload from './LogoUpload';

const CertificateForm = ({ formData, onChange, className = "" }) => {
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    onChange(name, value);
  }, [onChange]);

  const handleFileChange = useCallback((field, file) => {
    onChange(field, file);
  }, [onChange]);

  return (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
      {/* Form Content */}
      <div className="p-6 space-y-8">
        {/* Recipient Information */}
        <div className="space-y-4">
          <Input
            label="Recipient Name"
            name="recipientName"
            value={formData.recipientName}
            onChange={handleInputChange}
            placeholder="Enter recipient's name"
            required
          />
          <Input
            label="Recipient Email"
            name="recipientEmail"
            type="email"
            value={formData.recipientEmail}
            onChange={handleInputChange}
            placeholder="Enter recipient's email"
          />
        </div>

        {/* Course Information */}
        <div className="space-y-4">
          <Input
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            placeholder="Enter course name"
            required
          />
          <Input
            label="Completion Date"
            name="completionDate"
            type="date"
            value={formData.completionDate}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Logo and Signature */}
        <div className="space-y-4">
          <LogoUpload
            logo={formData.logo}
            onChange={(file) => handleFileChange('logo', file)}
          />
          <SignatureUpload
            signature={formData.signature}
            onChange={(file) => handleFileChange('signature', file)}
          />
        </div>
      </div>
    </div>
  );
};

export default CertificateForm; 