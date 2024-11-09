import QRCode from 'qrcode.react';

const QRCodeGenerator = ({ certificateId, size = 128 }) => {
  const verificationUrl = `${window.location.origin}/verify/${certificateId}`;

  return (
    <div className="flex flex-col items-center">
      <QRCode
        value={verificationUrl}
        size={size}
        level="H"
        includeMargin={true}
        renderAs="svg"
      />
      <p className="mt-2 text-xs text-gray-500">Scan to verify certificate</p>
    </div>
  );
};

export default QRCodeGenerator; 