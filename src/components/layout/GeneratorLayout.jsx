import { motion } from 'framer-motion';
import { useState } from 'react';

const GeneratorLayout = ({ 
  header,
  sidebar,
  preview,
  isMobile,
  activeStep,
  steps,
  onStepChange 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          {header}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <motion.div
          initial={false}
          animate={{
            width: isSidebarOpen ? 'auto' : '0px',
            opacity: isSidebarOpen ? 1 : 0
          }}
          className={`bg-white border-r border-gray-200 flex-shrink-0 ${
            isMobile ? 'absolute inset-y-0 left-0 z-40' : ''
          }`}
          style={{ maxWidth: '480px' }}
        >
          <div className="h-full w-[480px] overflow-y-auto">
            {/* Steps Progress */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex space-x-4">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => onStepChange(index)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      activeStep === index
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <span className="flex items-center justify-center space-x-2">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                        activeStep === index
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {index + 1}
                      </span>
                      <span>{step.name}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Content */}
            <div className="p-6">
              {sidebar}
            </div>
          </div>
        </motion.div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-4xl mx-auto">
            {preview}
          </div>
        </div>

        {/* Mobile Toggle Button */}
        {isMobile && (
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg ${
              isSidebarOpen ? 'bg-red-500 text-white' : 'bg-indigo-600 text-white'
            }`}
          >
            {isSidebarOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default GeneratorLayout; 