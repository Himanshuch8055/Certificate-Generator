import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Container from '../ui/Container';
import PageTransition from '../PageTransition';

export default function PageLayout({ children }) {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar with conditional styling */}
      <div
        className={`sticky top-0 z-50 transition-all duration-200 ${
          scrolled ? 'bg-white shadow-md' : isHomePage ? 'bg-transparent' : 'bg-white'
        }`}
      >
        <Navbar />
      </div>

      {/* Main content */}
      <main className="flex-grow">
        <div className={`
          w-full
          ${!isHomePage && 'py-6 sm:py-8 lg:py-12 bg-gray-50'}
        `}>
          {isHomePage ? (
            <PageTransition>{children}</PageTransition>
          ) : (
            <Container>
              <PageTransition>{children}</PageTransition>
            </Container>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>

      {/* Scroll to top button */}
      <ScrollToTop />
    </div>
  );
}

// Scroll to top button component
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-4 right-4 z-50
            p-2 rounded-full bg-indigo-600 text-white
            shadow-lg hover:bg-indigo-700
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
            sm:bottom-8 sm:right-8
          `}
          aria-label="Scroll to top"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  );
} 