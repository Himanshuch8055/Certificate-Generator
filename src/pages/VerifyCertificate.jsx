import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import PageLayout from '../components/layout/PageLayout';

export default function VerifyCertificate() {
  const { certificateId } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function verifyCertificate() {
      try {
        const certRef = doc(db, 'certificates', certificateId);
        const certDoc = await getDoc(certRef);
        
        if (certDoc.exists()) {
          setCertificate(certDoc.data());
        } else {
          setError('Certificate not found');
        }
      } catch (err) {
        setError('Failed to verify certificate');
      } finally {
        setLoading(false);
      }
    }

    verifyCertificate();
  }, [certificateId]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{error}</h2>
            <p className="text-gray-500">The certificate you're looking for could not be verified.</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Certificate Verified</h2>
            <p className="text-center text-gray-500 mb-6">This certificate is authentic and was issued by our platform.</p>
          </div>

          <div className="px-6 py-4">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-gray-500">Recipient Name</dt>
                <dd className="mt-1 text-lg font-medium text-gray-900">{certificate.recipientName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Course Name</dt>
                <dd className="mt-1 text-lg font-medium text-gray-900">{certificate.courseName}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Issue Date</dt>
                <dd className="mt-1 text-lg font-medium text-gray-900">
                  {new Date(certificate.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-500">Certificate ID</dt>
                <dd className="mt-1 text-lg font-medium text-gray-900">{certificate.certificateId}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 