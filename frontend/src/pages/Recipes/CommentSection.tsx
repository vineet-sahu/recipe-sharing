/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CommentCard } from "../../components/CommentCard";

interface Comment {
  _id: string;
  user?: {
    name: string;
    avatar?: string;
  };
  content ?: string;
  text?: string;
  createdAt?: string | undefined;
}

interface CommentsSectionProps {
  comments: Comment[];
  onSubmitComment: (e: any) => Promise<void>;
}

const CommentsSection = ({ comments, onSubmitComment }: CommentsSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      await onSubmitComment(newComment.trim());
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFocus = (e: React.FocusEvent) => {
    e.preventDefault();

    if (!user) {
      navigate(`/login?redirect=${location.pathname}`);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-full">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">
          Comments ({comments.length})
        </h2>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newComment}
          onFocus={handleFocus}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Share your thoughts about this recipe..."
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none"
        />
        {user && (
          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="bg-gradient-to-r cursor-pointer from-orange-500 to-red-500 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Posting..." : "Post Comment"}
            </button>
          </div>
        )}
      </form>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        ) : (
          comments.map((comment) => <CommentCard key={comment._id} comment={{...comment, text: comment.text || ""}} />)
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
