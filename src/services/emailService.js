import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';

export const sendCertificateEmail = async (certificateData) => {
  try {
    const sendEmail = httpsCallable(functions, 'sendCertificateEmail');
    const result = await sendEmail({
      recipientEmail: certificateData.recipientEmail,
      recipientName: certificateData.recipientName,
      certificateId: certificateData.certificateId,
      courseName: certificateData.courseName,
      pdfUrl: certificateData.pdfUrl
    });
    return result.data;
  } catch (error) {
    console.error('Error sending certificate email:', error);
    throw new Error('Failed to send certificate email');
  }
}; 