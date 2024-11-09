import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/layout/PageLayout';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Professional Templates',
    description: 'Choose from a variety of professionally designed certificate templates.',
    icon: '🎨'
  },
  {
    title: 'Easy Customization',
    description: 'Customize your certificates with logos, signatures, and personal details.',
    icon: '✏️'
  },
  {
    title: 'Instant Download',
    description: 'Generate and download your certificates instantly in PDF format.',
    icon: '⚡'
  },
  {
    title: 'Secure Storage',
    description: 'All your certificates are securely stored for future access.',
    icon: '🔒'
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Course Creator',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'CertifyPro has streamlined our certificate generation process. It\'s incredibly easy to use and looks professional.'
  },
  {
    name: 'Michael Chen',
    role: 'Education Director',
    image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    quote: 'The variety of templates and customization options is impressive. Our students love their certificates!'
  }
];

const stats = [
  { label: 'Certificates Created', value: '50K+' },
  { label: 'Active Users', value: '10K+' },
  { label: 'Templates', value: '100+' },
  { label: 'Countries', value: '50+' }
];

const LandingPage = () => {
  const { currentUser } = useAuth();

  const content = (
    <div className="bg-white">
      {/* Hero Section - Improved spacing and responsiveness */}
      <div className="relative min-h-[calc(100vh-64px)] bg-gradient-to-r from-indigo-600 to-indigo-800">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex items-center h-full py-16 sm:py-24 lg:py-32">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <div className="text-center lg:text-left max-w-3xl">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
                  <span className="block mb-2">Create Professional</span>
                  <span className="block text-indigo-200">Certificates Instantly</span>
                </h1>
                <p className="mt-6 text-lg sm:text-xl text-indigo-100 max-w-2xl mx-auto lg:mx-0">
                  Generate beautiful certificates for your courses, achievements, and events in minutes.
                  Choose from multiple templates and customize them to your needs.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link
                    to={currentUser ? "/generator" : "/signup"}
                    className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    {currentUser ? "Create Certificate" : "Get Started Free"}
                  </Link>
                  <a
                    href="#features"
                    className="w-full sm:w-auto inline-flex justify-center items-center px-8 py-4 border-2 border-indigo-100 text-base font-medium rounded-lg text-indigo-100 hover:bg-indigo-700 transition-all duration-200"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section - Enhanced layout and spacing */}
      <div id="features" className="py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Everything you need to create certificates
              </p>
              <p className="mt-4 text-xl text-gray-500">
                Create professional certificates in minutes with our easy-to-use platform.
              </p>
            </motion.div>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="absolute -top-4 left-6 h-12 w-12 rounded-xl bg-indigo-500 text-white text-2xl flex items-center justify-center shadow-lg">
                    {feature.icon}
                  </div>
                  <div className="mt-8">
                    <p className="text-xl font-semibold text-gray-900 mb-3">
                      {feature.title}
                    </p>
                    <p className="text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section - Improved visual hierarchy */}
      <div className="bg-indigo-800 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:gap-6 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-indigo-700 rounded-2xl p-8"
              >
                <p className="text-5xl font-extrabold text-white mb-2">{stat.value}</p>
                <p className="text-lg font-medium text-indigo-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section - Enhanced cards and layout */}
      <div className="py-24 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                Testimonials
              </h2>
              <p className="mt-3 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Trusted by educators worldwide
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center">
                    <img
                      className="h-14 w-14 rounded-full ring-4 ring-indigo-50"
                      src={testimonial.image}
                      alt={testimonial.name}
                    />
                    <div className="ml-4">
                      <div className="text-lg font-semibold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-indigo-600 font-medium">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="mt-6 text-gray-600 leading-relaxed">{testimonial.quote}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Improved layout and responsiveness */}
      <div className="bg-gradient-to-r from-indigo-50 to-indigo-100">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  <span className="block mb-1">Ready to get started?</span>
                  <span className="block text-indigo-600">Create your first certificate today.</span>
                </h2>
                <p className="mt-4 text-lg text-gray-500 max-w-2xl">
                  Join thousands of educators and professionals who trust our platform.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="inline-flex rounded-lg shadow">
                  <Link
                    to={currentUser ? "/generator" : "/signup"}
                    className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
                  >
                    {currentUser ? "Create Certificate" : "Get Started Free"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Layout rendering logic remains the same
  if (!currentUser) {
    return (
      <>
        <Navbar />
        {content}
      </>
    );
  }

  return <PageLayout>{content}</PageLayout>;
};

export default LandingPage; 