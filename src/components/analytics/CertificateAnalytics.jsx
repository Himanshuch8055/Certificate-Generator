import { useState, useEffect } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function CertificateAnalytics({ certificates }) {
  const [analytics, setAnalytics] = useState({
    totalCertificates: 0,
    certificatesPerMonth: {},
    templatesUsage: {},
  });

  useEffect(() => {
    const processAnalytics = () => {
      const perMonth = {};
      const templates = {};
      
      certificates.forEach(cert => {
        // Process monthly data
        const date = new Date(cert.createdAt);
        const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
        perMonth[monthKey] = (perMonth[monthKey] || 0) + 1;

        // Process template usage
        templates[cert.selectedTemplate] = (templates[cert.selectedTemplate] || 0) + 1;
      });

      setAnalytics({
        totalCertificates: certificates.length,
        certificatesPerMonth: perMonth,
        templatesUsage: templates,
      });
    };

    processAnalytics();
  }, [certificates]);

  const lineChartData = {
    labels: Object.keys(analytics.certificatesPerMonth),
    datasets: [
      {
        label: 'Certificates Generated',
        data: Object.values(analytics.certificatesPerMonth),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: Object.keys(analytics.templatesUsage),
    datasets: [
      {
        data: Object.values(analytics.templatesUsage),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Total Certificates
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {analytics.totalCertificates}
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            This Month
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {analytics.certificatesPerMonth[
              `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
            ] || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Templates Used
          </h3>
          <p className="text-3xl font-bold text-indigo-600">
            {Object.keys(analytics.templatesUsage).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Certificates Over Time
          </h3>
          <div className="h-64">
            <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Template Usage
          </h3>
          <div className="h-64">
            <Pie data={pieChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
} 