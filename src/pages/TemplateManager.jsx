import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import { certificateTemplates } from '../data/certificateTemplates';

export default function TemplateManager() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customization, setCustomization] = useState({
    fontFamily: '',
    primaryColor: '',
    secondaryColor: '',
    borderStyle: ''
  });

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Template Manager</h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificateTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                    selectedTemplate?.id === template.id
                      ? 'border-indigo-500 shadow-lg'
                      : 'border-gray-200 hover:border-indigo-300'
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <div className={`aspect-w-16 aspect-h-9 rounded-lg mb-4 ${template.bgColor} ${template.pattern}`} />
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                </div>
              ))}
            </div>

            {selectedTemplate && (
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Customize Template
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Font Family
                    </label>
                    <select
                      value={customization.fontFamily}
                      onChange={(e) => setCustomization(prev => ({ ...prev, fontFamily: e.target.value }))}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select Font</option>
                      <option value="font-serif">Serif</option>
                      <option value="font-sans">Sans</option>
                      <option value="font-mono">Mono</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Color
                    </label>
                    <input
                      type="color"
                      value={customization.primaryColor}
                      onChange={(e) => setCustomization(prev => ({ ...prev, primaryColor: e.target.value }))}
                      className="mt-1 block w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secondary Color
                    </label>
                    <input
                      type="color"
                      value={customization.secondaryColor}
                      onChange={(e) => setCustomization(prev => ({ ...prev, secondaryColor: e.target.value }))}
                      className="mt-1 block w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Border Style
                    </label>
                    <select
                      value={customization.borderStyle}
                      onChange={(e) => setCustomization(prev => ({ ...prev, borderStyle: e.target.value }))}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option value="">Select Style</option>
                      <option value="border-solid">Solid</option>
                      <option value="border-dashed">Dashed</option>
                      <option value="border-double">Double</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 