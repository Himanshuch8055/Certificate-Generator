import { lazy } from 'react';

// Lazy load components
const LandingPage = lazy(() => import('../pages/LandingPage'));
const Login = lazy(() => import('../pages/Login'));
const Signup = lazy(() => import('../pages/Signup'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const CertificateGenerator = lazy(() => import('../pages/CertificateGenerator'));
const ProfileSettings = lazy(() => import('../pages/ProfileSettings'));
const TemplateManager = lazy(() => import('../pages/TemplateManager'));
const TemplateMarketplace = lazy(() => import('../pages/TemplateMarketplace'));
const VerifyCertificate = lazy(() => import('../pages/VerifyCertificate'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const routes = [
  {
    path: '/',
    element: LandingPage,
    isPublic: true,
  },
  {
    path: '/login',
    element: Login,
    isPublic: true,
  },
  {
    path: '/signup',
    element: Signup,
    isPublic: true,
  },
  {
    path: '/dashboard',
    element: Dashboard,
    isPrivate: true,
  },
  {
    path: '/generator',
    element: CertificateGenerator,
    isPrivate: true,
  },
  {
    path: '/profile',
    element: ProfileSettings,
    isPrivate: true,
  },
  {
    path: '/templates',
    element: TemplateManager,
    isPrivate: true,
  },
  {
    path: '/marketplace',
    element: TemplateMarketplace,
    isPrivate: true,
  },
  {
    path: '/verify/:certificateId',
    element: VerifyCertificate,
    isPublic: true,
  },
  {
    path: '*',
    element: NotFound,
    isPublic: true,
  }
]; 