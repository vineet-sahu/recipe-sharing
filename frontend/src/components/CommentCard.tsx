import { Comment } from "../types/Comment";
import { formatDate } from "../utils/date";

type CommentCardProps = {
    comment: Comment;
}

export const CommentCard = ({ comment: {user, createdAt="", text} }: CommentCardProps) => {
    return (
      <div className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
              {user.email.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium text-gray-900">{user.email}</span>
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(createdAt)}
          </span>
        </div>
        <p className="text-gray-700 ml-11">{text}</p>
      </div>
    );
  };