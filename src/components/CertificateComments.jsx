import { useState } from 'react';
import { format } from 'date-fns';

const CertificateComments = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    onAddComment({
      id: Date.now(),
      text: newComment,
      author: 'Current User',
      datetime: new Date().toISOString(),
    });
    setNewComment('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Comments</h3>
      
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-start space-x-4">
          <div className="min-w-0 flex-1">
            <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
              <textarea
                rows={3}
                name="comment"
                id="comment"
                className="block w-full py-3 px-4 border-0 resize-none focus:ring-0 sm:text-sm"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Post
            </button>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="flow-root">
        <ul className="-mb-8">
          {comments.map((comment, commentIdx) => (
            <li key={comment.id}>
              <div className="relative pb-8">
                {commentIdx !== comments.length - 1 ? (
                  <span
                    className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {comment.author[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <span className="font-medium text-gray-900">
                          {comment.author}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        {format(new Date(comment.datetime), 'MMM d, yyyy HH:mm')}
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>{comment.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CertificateComments; 