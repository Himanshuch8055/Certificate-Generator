import { useState, useCallback, useRef } from 'react';
import CertificateForm from '../components/CertificateForm';
import CertificatePreview from '../components/CertificatePreview';
import TemplateSelector from '../components/TemplateSelector';
import ExpirationManager from '../components/ExpirationManager';
import ShareCertificate from '../components/ShareCertificate';
import StatusBadge from '../components/StatusBadge';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/ui/PageHeader';
import { generateCertificateId } from '../utils/helpers';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { sendCertificateEmail } from '../services/emailService';
import CertificateHistory from '../components/CertificateHistory';
import CertificateComments from '../components/CertificateComments';
import CertificateTags from '../components/CertificateTags';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../config/firebase';
import { useAuth } from '../context/AuthContext';
import html2canvas from 'html2canvas';
import { v4 as uuidv4 } from 'uuid';
import { Transition } from '@headlessui/react';
import { Monitor, Tablet, Phone, Copy, Save, Send, ChevronLeft, ChevronRight } from 'lucide-react';

const CertificateGenerator = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const previewRef = useRef(null);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

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

  // Function to capture preview as image
  const capturePreview = async () => {
    if (previewRef.current) {
      const canvas = await html2canvas(previewRef.current);
      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, 'image/png');
      });
    }
    return null;
  };

  // Enhanced save function with preview image
  const handleSave = async () => {
    if (!formData.recipientName || !formData.courseName) {
      alert('Please fill in all required fields');
      return;
    }

    setSaving(true);
    try {
      // Capture preview image
      const previewBlob = await capturePreview();
      
      // Upload preview to Storage
      const storage = getStorage();
      const previewPath = `certificates/${currentUser.uid}/${formData.certificateId}/preview.png`;
      const previewRef = ref(storage, previewPath);
      await uploadBytes(previewRef, previewBlob);
      const previewUrl = await getDownloadURL(previewRef);

      // Save certificate data to Firestore
      const certificateRef = doc(db, 'certificates', formData.certificateId);
      await setDoc(certificateRef, {
        ...formData,
        previewUrl,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active'
      });

      // Send email if recipient email is provided
      if (formData.recipientEmail) {
        await sendCertificateEmail({
          recipientEmail: formData.recipientEmail,
          recipientName: formData.recipientName,
          certificateId: formData.certificateId,
          courseName: formData.courseName,
          previewUrl
        });
      }

      setShowShareModal(true);
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Failed to save certificate');
    } finally {
      setSaving(false);
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

  // Function to duplicate template
  const handleDuplicate = () => {
    const newId = uuidv4();
    setFormData(prev => ({
      ...prev,
      certificateId: newId,
      recipientName: '',
      recipientEmail: ''
    }));
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1920px] mx-auto px-3 sm:px-6 lg:px-8">

          {/* Main Content with Enhanced Grid Layout */}
          <div className="mt-6 pb-24 sm:pb-0">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              {/* Left Panel - Design Tools */}
              <AnimatePresence mode="wait">
                {(!isMobile || activeStep !== 2) && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="xl:col-span-7 space-y-6"
                  >
                    {(!isMobile || activeStep === 0) && (
                      <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Choose Template</h3>
                        <TemplateSelector
                          selectedTemplate={formData.selectedTemplate}
                          onChange={handleTemplateChange}
                        />
                      </div>
                    )}
                    
                    {(!isMobile || activeStep === 1) && (
                      <>
                        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Certificate Details</h3>
                          <CertificateForm
                            formData={formData}
                            onChange={handleFormUpdate}
                          />
                        </div>

                        <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Options</h3>
                          <div className="space-y-6">
                            <ExpirationManager
                              onExpirationSet={handleExpirationSet}
                              currentDate={formData.expirationDate}
                            />
                            <CertificateTags
                              tags={tags}
                              onAddTag={handleAddTag}
                              onRemoveTag={handleRemoveTag}
                              suggestions={['Course', 'Achievement', 'Training', 'Workshop']}
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Right Panel - Preview and Details */}
              <AnimatePresence mode="wait">
                {(!isMobile || activeStep === 2) && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="xl:col-span-5 space-y-6"
                  >
                    {/* Certificate Preview */}
                    <div ref={previewRef} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
                      <CertificatePreview
                        formData={formData}
                      />
                    </div>

                    {/* Additional Details */}
                    {(!isMobile || activeStep === 2) && (
                      <>
                        <ShareCertificate
                          certificateId={formData.certificateId}
                          recipientName={formData.recipientName}
                          courseName={formData.courseName}
                          previewUrl={previewImage}
                        />
                        <CertificateHistory history={history} />
                        <CertificateComments
                          comments={comments}
                          onAddComment={handleAddComment}
                          currentUser={currentUser}
                        />
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Enhanced Mobile Navigation */}
          {isMobile && (
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg backdrop-blur-sm bg-white/90"
            >
              <div className="flex justify-between items-center max-w-md mx-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                  disabled={activeStep === 0}
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 disabled:opacity-50 transition-colors duration-200"
                >
                  <ChevronLeft className="h-5 w-5 mr-1" />
                  Previous
                </motion.button>
                <div className="flex space-x-2">
                  {[0, 1, 2].map((idx) => (
                    <motion.div
                      key={idx}
                      initial={false}
                      animate={{
                        backgroundColor: idx === activeStep ? '#4F46E5' : '#E5E7EB',
                        scale: idx === activeStep ? 1.2 : 1
                      }}
                      className="h-1.5 w-4 rounded-full"
                    />
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveStep(Math.min(2, activeStep + 1))}
                  disabled={activeStep === 2}
                  className="flex items-center px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-50 transition-colors duration-200"
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-1" />
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CertificateGenerator;