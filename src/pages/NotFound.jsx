import { Link } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';

const NotFound = () => {
  return (
    <PageLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-indigo-600">404</h1>
          <h2 className="mt-4 text-2xl font-semibold text-gray-900">Page not found</h2>
          <p className="mt-2 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NotFound; 