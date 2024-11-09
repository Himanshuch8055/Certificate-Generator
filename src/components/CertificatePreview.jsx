import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { format } from 'date-fns';
import { certificateTemplates, getTemplateStyle } from '../data/certificateTemplates';
import QRCodeGenerator from './QRCodeGenerator';

const CertificatePreview = ({ formData, show }) => {
  const certificateRef = useRef(null);
  const [downloading, setDownloading] = useState(false);
  const selectedTemplate = certificateTemplates.find(t => t.id === formData.selectedTemplate) || certificateTemplates[0];
  const templateStyle = getTemplateStyle(selectedTemplate.id);

  const downloadCertificate = async () => {
    if (!certificateRef.current || downloading) return;

    try {
      setDownloading(true);

      // Create high-quality canvas
      const canvas = await html2canvas(certificateRef.current, {
        scale: 4, // Increase quality
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null,
        windowWidth: 1920, // Force desktop resolution
        windowHeight: 1080,
        onclone: (document) => {
          // Any DOM manipulations before capture
          const element = document.querySelector('.certificate-content');
          if (element) {
            element.style.transform = 'none';
            element.style.borderRadius = '0';
          }
        }
      });

      // Create PDF with proper dimensions
      const imgWidth = 297; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add metadata
      pdf.setProperties({
        title: `Certificate - ${formData.recipientName}`,
        subject: `Certificate of Completion for ${formData.courseName}`,
        author: 'CertifyPro',
        keywords: 'certificate, completion',
        creator: 'CertifyPro Certificate Generator'
      });

      // Add image to PDF with high quality
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, '', 'FAST');

      // Add certificate ID as invisible text for searchability
      pdf.setFontSize(1);
      pdf.setTextColor(255, 255, 255);
      pdf.text(`Certificate ID: ${formData.certificateId}`, 10, 10);

      // Generate filename
      const filename = `${formData.recipientName.replace(/\s+/g, '_')}_Certificate_${format(
        new Date(),
        'yyyy-MM-dd'
      )}.pdf`;

      // Save the PDF
      pdf.save(filename);

      // Optional: Return the PDF data for further processing
      return {
        pdfBlob: pdf.output('blob'),
        filename: filename
      };

    } catch (error) {
      console.error('Error generating certificate:', error);
      throw new Error('Failed to generate certificate. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden">
        <div
          ref={certificateRef}
          className={`relative w-full aspect-[1.414/1] p-8 ${selectedTemplate.borderStyle} certificate-content`}
        >
          <div className={`absolute inset-0 ${selectedTemplate.bgColor} ${selectedTemplate.pattern}`} />
          
          {formData.logo && (
            <div className="absolute top-8 left-8 w-20 h-20">
              <img
                src={URL.createObjectURL(formData.logo)}
                alt="Logo"
                className="w-full h-full object-contain"
                crossOrigin="anonymous"
              />
            </div>
          )}
          
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
            <h1 className={`text-4xl sm:text-5xl ${selectedTemplate.fontStyle} font-bold ${templateStyle.titleColor} mb-8`}>
              Certificate of Completion
            </h1>
            <p className={`text-lg ${templateStyle.textColor} mb-4`}>This is to certify that</p>
            <h2 className={`text-3xl sm:text-4xl ${selectedTemplate.fontStyle} font-bold ${templateStyle.titleColor} mb-4`}>
              {formData.recipientName || 'Recipient Name'}
            </h2>
            <p className={`text-lg ${templateStyle.textColor} mb-4`}>has successfully completed the course</p>
            <h3 className={`text-2xl sm:text-3xl ${selectedTemplate.fontStyle} font-bold ${templateStyle.titleColor} mb-8`}>
              {formData.courseName || 'Course Name'}
            </h3>
            <p className={`text-lg ${templateStyle.textColor}`}>
              Completed on {format(new Date(formData.completionDate), 'MMMM dd, yyyy')}
            </p>
            
            {formData.signature && (
              <div className="mt-8">
                <img
                  src={URL.createObjectURL(formData.signature)}
                  alt="Signature"
                  className="h-16 object-contain"
                  crossOrigin="anonymous"
                />
                <div className={`w-48 border-t mt-2 ${templateStyle.accentColor}`}>
                  <p className={`text-sm ${templateStyle.textColor}`}>Authorized Signature</p>
                </div>
              </div>
            )}

            <div className="mt-8">
              <p className={`text-sm ${templateStyle.accentColor}`}>Certificate ID: {formData.certificateId}</p>
            </div>
          </div>
          
          {/* Add QR Code */}
          <div className="absolute bottom-8 right-8">
            <QRCodeGenerator certificateId={formData.certificateId} size={80} />
          </div>
        </div>
      </div>

      <button
        onClick={downloadCertificate}
        disabled={downloading}
        className={`
          w-full inline-flex justify-center items-center rounded-md border border-transparent 
          bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm 
          hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 
          focus:ring-offset-2 transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {downloading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            Generating PDF...
          </>
        ) : (
          'Download Certificate'
        )}
      </button>
    </div>
  );
};

export default CertificatePreview;