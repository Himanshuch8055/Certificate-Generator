import { certificateTemplates } from '../data/certificateTemplates';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Select Template</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {certificateTemplates.map((template) => (
          <div
            key={template.id}
            className={`cursor-pointer rounded-lg border-2 p-2 transition-all duration-200 transform hover:scale-105 ${
              selectedTemplate === template.id
                ? 'border-indigo-500 shadow-lg'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => onChange(template.id)}
          >
            <div className="relative aspect-w-16 aspect-h-9 mb-2">
              <div 
                className={`w-full h-full rounded ${template.bgColor} ${template.pattern}`}
              />
            </div>
            <p className="text-sm text-center font-medium">{template.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector; 