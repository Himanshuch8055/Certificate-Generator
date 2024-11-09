import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/ui/PageHeader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useMediaQuery } from '../hooks/useMediaQuery';
import CertificateAnalytics from '../components/analytics/CertificateAnalytics';

export default function Dashboard() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const isMobile = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const q = query(
          collection(db, 'certificates'),
          where('userId', '==', currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const certificateList = [];
        querySnapshot.forEach((doc) => {
          certificateList.push({ id: doc.id, ...doc.data() });
        });
        setCertificates(certificateList);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
      setLoading(false);
    };

    fetchCertificates();
  }, [currentUser]);

  const handleDownload = (cert) => {
    try {
      if (cert.pdfUrl) {
        window.open(cert.pdfUrl, '_blank');
      } else {
        // If no PDF URL, generate one (you might want to implement this)
        console.log('No PDF URL available for this certificate');
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };

  const CreateNewButton = () => (
    <button
      onClick={() => window.location.href = '/generator'}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Create New Certificate
    </button>
  );

  return (
    <PageLayout>
      <div className="space-y-8">
        {/* Analytics Section */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Analytics Overview
          </h2>
          <CertificateAnalytics certificates={certificates} />
        </section>

        {/* Existing Certificates Section */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Your Certificates
            </h2>
            <CreateNewButton />
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
            </div>
          ) : certificates.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No certificates yet</h3>
              <p className="text-gray-500 mb-6">Create your first certificate to get started</p>
              <Link
                to="/generator"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Certificate
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert) => (
                <Card key={cert.id}>
                  <Card.Body>
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500">
                        Created: {new Date(cert.createdAt || cert.completionDate).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">
                      {cert.recipientName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {cert.courseName}
                    </p>
                    <p className="text-xs text-gray-400">
                      ID: {cert.certificateId}
                    </p>
                  </Card.Body>
                  <Card.Footer className="flex justify-between space-x-4">
                    <button
                      onClick={() => handleDownload(cert)}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Download
                    </button>
                    <button
                      onClick={() => window.open(`/generator?edit=${cert.id}`, '_blank')}
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Edit
                    </button>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </PageLayout>
  );
} 