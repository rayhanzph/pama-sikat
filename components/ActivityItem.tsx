
import React, { useState } from 'react';
import { Report } from '../types.ts';
import { useAppContext } from '../contexts/AppContext.tsx';

interface ActivityItemProps {
  report: Report;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ report }) => {
  const { user, addComment } = useAppContext();
  const [commentText, setCommentText] = useState('');
  const [showComments, setShowComments] = useState(false);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(report.id, commentText);
    setCommentText('');
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img className="h-12 w-12 rounded-full object-cover" src={`https://i.pravatar.cc/150?u=${report.author.nrp}`} alt={report.author.name} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-semibold text-slate-900">{report.author.name}</p>
              <p className="text-xs text-slate-500">NRP: {report.author.nrp}</p>
            </div>
            <p className="text-xs text-slate-500">{new Date(report.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
          <p className="mt-3 text-sm text-slate-700 whitespace-pre-wrap">{report.reportText}</p>
          
          {report.evidence && (
            <div className="mt-3">
                <img src={report.evidence} alt="Evidence" className="max-h-96 w-auto rounded-lg mx-auto" />
            </div>
          )}

          <div className="mt-4 flex items-center justify-between text-sm">
            <button onClick={() => setShowComments(!showComments)} className="text-blue-600 hover:underline">
              {showComments ? 'Sembunyikan' : 'Lihat'} Komentar ({report.comments.length})
            </button>
          </div>

          {showComments && (
            <div className="mt-4 space-y-4 pt-4 border-t border-slate-200">
              {report.comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <img className="h-8 w-8 rounded-full" src={`https://i.pravatar.cc/150?u=${comment.author.nrp}`} alt={comment.author.name} />
                  <div className="flex-1 bg-slate-100 rounded-lg p-3">
                    <p className="text-xs font-semibold">{comment.author.name}</p>
                    <p className="text-sm text-slate-800">{comment.text}</p>
                    <p className="text-xs text-slate-400 mt-1">{new Date(comment.timestamp).toLocaleString('id-ID')}</p>
                  </div>
                </div>
              ))}
              {report.comments.length === 0 && <p className="text-xs text-slate-500">Belum ada komentar.</p>}

              <form onSubmit={handleCommentSubmit} className="flex items-start space-x-3 pt-4">
                 <img className="h-8 w-8 rounded-full" src={`https://i.pravatar.cc/150?u=${user?.nrp}`} alt={user?.name} />
                 <div className="flex-1">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Tulis komentar..."
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                 </div>
                 <button type="submit" className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600">Kirim</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityItem;
