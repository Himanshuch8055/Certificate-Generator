import { useState, useCallback } from 'react';
import CertificateForm from '../components/CertificateForm';
import CertificatePreview from '../components/CertificatePreview';
import TemplateSelector from '../components/TemplateSelector';
import ExpirationManager from '../components/ExpirationManager';
import ShareCertificate from '../components/ShareCertificate';
import StatusBadge from '../components/StatusBadge';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/ui/PageHeader';
import { generateCertificateId } from '../utils/helpers';
import { motion } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { sendCertificateEmail } from '../services/emailService';
import CertificateHistory from '../components/CertificateHistory';
import CertificateComments from '../components/CertificateComments';
import CertificateTags from '../components/CertificateTags';

const CertificateGenerator = () => {
  // Enhanced state management
  const [formData, setFormData] = useState(() => ({
    recipientName: '',
    courseName: '',
    completionDate: new Date().toISOString().split('T')[0],
    certificateId: generateCertificateId(),
    signature: null,
    logo: null,
    selectedTemplate: 'elegant-gold',
    customFields: [],
    recipientEmail: '',
    expirationDate: null,
    status: 'valid'
  }));

  const [isSaving, setIsSaving] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [previewMode, setPreviewMode] = useState('desktop');
  const [showShareModal, setShowShareModal] = useState(false);

  const [history, setHistory] = useState([
    {
      id: 1,
      type: 'created',
      description: 'Certificate created',
      datetime: new Date().toISOString()
    }
  ]);
  
  const [comments, setComments] = useState([]);
  const [tags, setTags] = useState([]);

  // Responsive hooks
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Steps configuration
  const steps = [
    { id: 'template', name: 'Choose Template' },
    { id: 'details', name: 'Enter Details' },
    { id: 'preview', name: 'Preview & Share' }
  ];

  // Handlers
  const handleFormUpdate = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleTemplateChange = useCallback((templateId) => {
    setFormData(prev => ({
      ...prev,
      selectedTemplate: templateId
    }));
    if (isMobile) {
      setActiveStep(1);
    }
  }, [isMobile]);

  const handleExpirationSet = useCallback((date) => {
    setFormData(prev => ({
      ...prev,
      expirationDate: date
    }));
  }, []);

  const handleSave = async () => {
    if (!formData.recipientName || !formData.courseName) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      // Save logic here
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowShareModal(true);
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Failed to save certificate');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendEmail = async () => {
    if (!formData.recipientEmail) {
      alert('Please enter recipient email');
      return;
    }

    try {
      setIsSaving(true);
      await sendCertificateEmail({
        recipientEmail: formData.recipientEmail,
        recipientName: formData.recipientName,
        certificateId: formData.certificateId,
        courseName: formData.courseName
      });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddComment = (comment) => {
    setComments(prev => [...prev, comment]);
    // Add to history
    setHistory(prev => [...prev, {
      id: Date.now(),
      type: 'modified',
      description: 'Comment added',
      datetime: new Date().toISOString()
    }]);
  };

  const handleAddTag = (tag) => {
    setTags(prev => [...prev, tag]);
    // Add to history
    setHistory(prev => [...prev, {
      id: Date.now(),
      type: 'modified',
      description: `Tag "${tag}" added`,
      datetime: new Date().toISOString()
    }]);
  };

  const handleRemoveTag = (tag) => {
    setTags(prev => prev.filter(t => t !== tag));
    // Add to history
    setHistory(prev => [...prev, {
      id: Date.now(),
      type: 'modified',
      description: `Tag "${tag}" removed`,
      datetime: new Date().toISOString()
    }]);
  };

  return (
    <PageLayout>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <PageHeader
          title="Create Certificate"
          description="Design and customize your professional certificate"
          action={
            <div className="flex items-center space-x-4">
              <StatusBadge 
                status={formData.status} 
                expirationDate={formData.expirationDate}
              />
              <button
                onClick={handleSendEmail}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Send Email
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          }
        />

        {/* Mobile Stepper */}
        {isMobile && (
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${activeStep === index
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {step.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Design Tools */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-7 space-y-6 ${isMobile && activeStep === 2 ? 'hidden' : ''}`}
          >
            <div className="sticky top-6 space-y-6">
              {(!isMobile || activeStep === 0) && (
                <TemplateSelector
                  selectedTemplate={formData.selectedTemplate}
                  onChange={handleTemplateChange}
                />
              )}
              
              {(!isMobile || activeStep === 1) && (
                <>
                  <CertificateForm
                    formData={formData}
                    onChange={handleFormUpdate}
                    className="bg-white rounded-lg shadow-lg p-6"
                  />
                  <ExpirationManager
                    onExpirationSet={handleExpirationSet}
                  />
                  <CertificateTags
                    tags={tags}
                    onAddTag={handleAddTag}
                    onRemoveTag={handleRemoveTag}
                  />
                </>
              )}
            </div>
          </motion.div>

          {/* Right Panel - Preview and Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className={`lg:col-span-5 ${isMobile && activeStep !== 2 ? 'hidden' : ''}`}
          >
            <div className="lg:sticky lg:top-6 space-y-6">
              <CertificatePreview
                formData={formData}
                previewMode={previewMode}
              />
              {(!isMobile || activeStep === 2) && (
                <>
                  <ShareCertificate
                    certificateId={formData.certificateId}
                    recipientName={formData.recipientName}
                    courseName={formData.courseName}
                  />
                  <CertificateHistory history={history} />
                  <CertificateComments
                    comments={comments}
                    onAddComment={handleAddComment}
                  />
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
            <div className="flex justify-between">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setActiveStep(Math.min(2, activeStep + 1))}
                disabled={activeStep === 2}
                className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CertificateGenerator;