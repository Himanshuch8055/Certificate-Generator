import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import PageLayout from '../components/layout/PageLayout';
import Card from '../components/ui/Card';

export default function TemplateMarketplace() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true);
        setError(null);
        
        const templatesRef = collection(db, 'marketplaceTemplates');
        const q = filter === 'all' 
          ? query(templatesRef)
          : query(templatesRef, where('category', '==', filter));
        
        const snapshot = await getDocs(q);
        const templateList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        setTemplates(templateList);
      } catch (error) {
        console.error('Error fetching templates:', error);
        setError('Failed to load templates. Please try again later.');
        setTemplates([]); // Clear templates on error
      } finally {
        setLoading(false);
      }
    }

    fetchTemplates();
  }, [filter]);

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'academic', name: 'Academic' },
    { id: 'professional', name: 'Professional' },
    { id: 'achievement', name: 'Achievement' },
    { id: 'event', name: 'Event' }
  ];

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Template Marketplace</h1>
            <p className="mt-1 text-sm text-gray-500">
              Browse and use professional certificate templates
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {templates.length === 0 && !error ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                No templates found for this category.
              </div>
            ) : (
              templates.map(template => (
                <Card key={template.id} className="hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={template.previewUrl}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Card.Body>
                    <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">
                        {template.price === 0 ? 'Free' : `$${template.price}`}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {template.category}
                      </span>
                    </div>
                  </Card.Body>
                  <Card.Footer>
                    <button
                      onClick={() => {/* Handle template selection */}}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Use Template
                    </button>
                  </Card.Footer>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
} 