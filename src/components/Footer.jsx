const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-indigo-600 mb-4">
              CertifyPro
            </h3>
            <p className="text-gray-500 max-w-md">
              Create professional certificates instantly. Perfect for courses,
              achievements, and events.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#features"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#templates"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-4">
              <li>
                <a href="#help" className="text-gray-500 hover:text-gray-900">
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#privacy"
                  className="text-gray-500 hover:text-gray-900"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="text-gray-500 hover:text-gray-900">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} CertifyPro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 