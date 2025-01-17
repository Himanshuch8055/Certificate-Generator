import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Suspense } from "react";
import { routes } from "./routes/routes.config";
import RouteGuard from "./components/RouteGuard";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import { AnimatePresence } from "framer-motion";

// Create AnimatedRoutes component for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {routes.map(({ path, element: Element, isPrivate, isPublic }) => (
          <Route
            key={path}
            path={path}
            element={
              <RouteGuard isPrivate={isPrivate} isPublic={isPublic}>
                <Suspense fallback={<LoadingSpinner />}>
                  <Element />
                </Suspense>
              </RouteGuard>
            }
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <AnimatedRoutes />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
