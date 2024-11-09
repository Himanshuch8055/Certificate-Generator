import { useState } from 'react';
import { 
  FacebookShareButton, TwitterShareButton, LinkedinShareButton,
  FacebookIcon, TwitterIcon, LinkedinIcon
} from 'react-share';

const ShareCertificate = ({ certificateId, recipientName, courseName }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/verify/${certificateId}`;
  const title = `${recipientName} has completed ${courseName}!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Share Certificate</h3>
      <div className="space-y-4">
        {/* Social Media Sharing */}
        <div className="flex space-x-4">
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={shareUrl} title={title}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>

        {/* Copy Link */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 p-2 text-sm border rounded-md bg-gray-50"
          />
          <button
            onClick={handleCopyLink}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${copied 
                ? 'bg-green-500 text-white' 
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
          >
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareCertificate; 