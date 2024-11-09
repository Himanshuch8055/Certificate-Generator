export const certificateTemplates = [
  {
    id: 'elegant-gold',
    name: 'Elegant Gold',
    bgColor: 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-200',
    borderStyle: 'border-8 border-double border-yellow-800',
    fontStyle: 'font-certificate',
    pattern: 'bg-[radial-gradient(circle_at_center,_transparent_0%,_transparent_50%,_#f5d47520_50%,_transparent_52%,_transparent_100%)_50px_50px] bg-[length:100px_100px]'
  },
  {
    id: 'modern-blue', 
    name: 'Modern Blue',
    bgColor: 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600',
    borderStyle: 'border-4 border-solid border-white/30',
    fontStyle: 'font-sans',
    pattern: 'bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.15)_25%,rgba(255,255,255,0.15)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.15)_75%)] bg-[length:120px_120px]'
  },
  {
    id: 'corporate',
    name: 'Corporate',
    bgColor: 'bg-gradient-to-br from-slate-100 to-white',
    borderStyle: 'border-4 border-solid border-gray-800', 
    fontStyle: 'font-sans',
    pattern: 'bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.02)_20px,rgba(0,0,0,0.02)_40px)]'
  },
  {
    id: 'premium-gold',
    name: 'Premium Gold',
    bgColor: 'bg-gradient-to-br from-yellow-200 via-amber-200 to-yellow-200',
    borderStyle: 'border-[12px] border-double border-yellow-900',
    fontStyle: 'font-certificate',
    pattern: 'bg-[radial-gradient(circle_at_center,_#92400e10_0,_transparent_70%)]'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    bgColor: 'bg-gradient-to-br from-white to-gray-50',
    borderStyle: 'border-2 border-solid border-gray-300',
    fontStyle: 'font-sans',
    pattern: ''
  },
  {
    id: 'classic-red',
    name: 'Classic Red', 
    bgColor: 'bg-gradient-to-br from-red-100 via-red-200 to-red-100',
    borderStyle: 'border-8 border-double border-red-800',
    fontStyle: 'font-certificate',
    pattern: 'bg-[repeating-radial-gradient(circle_at_center,transparent_0,transparent_30px,rgba(185,28,28,0.05)_30px,transparent_40px)]'
  },
  {
    id: 'professional-dark',
    name: 'Professional Dark',
    bgColor: 'bg-gradient-to-br from-gray-900 to-gray-800',
    borderStyle: 'border-4 border-solid border-gray-600',
    fontStyle: 'font-sans', 
    pattern: 'bg-[linear-gradient(30deg,rgba(255,255,255,0.05)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.05)_50%,rgba(255,255,255,0.05)_75%,transparent_75%)] bg-[length:60px_60px]'
  },
  {
    id: 'gradient-modern',
    name: 'Gradient Modern',
    bgColor: 'bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500',
    borderStyle: 'border-2 border-solid border-white/20',
    fontStyle: 'font-sans',
    pattern: 'bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0,transparent_60%)] bg-[length:200px_200px]'
  },
  {
    id: 'academic',
    name: 'Academic',
    bgColor: 'bg-gradient-to-br from-blue-100 via-blue-50 to-blue-100',
    borderStyle: 'border-8 border-double border-blue-900',
    fontStyle: 'font-certificate',
    pattern: 'bg-[repeating-linear-gradient(45deg,transparent,transparent_40px,rgba(30,58,138,0.03)_40px,rgba(30,58,138,0.03)_80px)]'
  },
  {
    id: 'achievement',
    name: 'Achievement',
    bgColor: 'bg-gradient-to-br from-green-100 via-green-200 to-green-100',
    borderStyle: 'border-4 border-solid border-green-800',
    fontStyle: 'font-sans',
    pattern: 'bg-[radial-gradient(circle_at_center,transparent_0,transparent_40px,rgba(22,101,52,0.05)_40px,transparent_50px)] bg-[length:100px_100px]'
  }
];

// Template styles configuration
export const templateStyles = {
  'elegant-gold': {
    titleColor: 'text-yellow-900',
    textColor: 'text-yellow-800', 
    accentColor: 'text-yellow-700'
  },
  'modern-blue': {
    titleColor: 'text-white',
    textColor: 'text-blue-50',
    accentColor: 'text-blue-100'
  },
  'corporate': {
    titleColor: 'text-gray-900',
    textColor: 'text-gray-800',
    accentColor: 'text-gray-700'
  },
  'premium-gold': {
    titleColor: 'text-yellow-900',
    textColor: 'text-yellow-800',
    accentColor: 'text-yellow-700'
  },
  'minimalist': {
    titleColor: 'text-gray-900',
    textColor: 'text-gray-700',
    accentColor: 'text-gray-600'
  },
  'classic-red': {
    titleColor: 'text-red-900',
    textColor: 'text-red-800',
    accentColor: 'text-red-700'
  },
  'professional-dark': {
    titleColor: 'text-white',
    textColor: 'text-gray-200',
    accentColor: 'text-gray-300'
  },
  'gradient-modern': {
    titleColor: 'text-white',
    textColor: 'text-pink-50',
    accentColor: 'text-pink-100'
  },
  'academic': {
    titleColor: 'text-blue-900',
    textColor: 'text-blue-800',
    accentColor: 'text-blue-700'
  },
  'achievement': {
    titleColor: 'text-green-900',
    textColor: 'text-green-800',
    accentColor: 'text-green-700'
  }
};

/**
 * Get style configuration for a specific template
 * @param {string} templateId - The ID of the template
 * @returns {Object} Template style configuration
 */
export const getTemplateStyle = (templateId) => {
  return templateStyles[templateId] || templateStyles['elegant-gold'];
};