export const generateCertificateId = () => {
  return `CERT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}; 