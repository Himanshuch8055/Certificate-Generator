import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RouteGuard = ({ children, isPrivate, isPublic }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isPrivate && !currentUser) {
      navigate('/login', { replace: true });
    }
    if (currentUser && isPublic && !isPrivate && 
        ['/login', '/signup'].includes(location.pathname)) {
      navigate('/', { replace: true });
    }
  }, [currentUser, isPrivate, isPublic, navigate, location]);

  return children;
};

export default RouteGuard; 