import { useDispatch, useSelector } from "react-redux";
import {
  getAllComments,
  createComment,
  updateComment,
  likeComment,
} from "../../redux/thunk/commentThunks";
import { useNavigate } from "react-router-dom";
import { updateRating } from "../../redux/thunk/projectThunks";
import { useEffect, useState } from "react";
import { CiStar, CiPen } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";

const Comments = ({ projectId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const commentState = useSelector((state) => state.comment);
  const currentUserState = useSelector((state) => state.navbar);
  const [commentContent, setCommentContent] = useState("");
  const [rating, setRating] = useState(0);
  const [pushComment, setPushComment] = useState(false);

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch]);

  useEffect(() => {
    if (pushComment) {
      dispatch(getAllComments());
      setPushComment(false);
    }
  }, [dispatch, pushComment]);

  const allComments = commentState.data || [];
  const allCommentsForProject = allComments.filter((comment) => {
    if (!comment.project) {
      console.error("Comment has no project:", comment);
      return false;
    }
    return comment.project.id === projectId;
  });

  const currentUserId = currentUserState.data?.data?.user._id;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (currentUserId) {
      const existingComment = allCommentsForProject.find(
        (comment) => comment.user._id === currentUserId
      );
      if (existingComment) {
        await dispatch(
          updateComment({
            id: existingComment._id,
            content: commentContent,
            rating,
          })
        );
      } else {
        await dispatch(
          createComment({
            content: commentContent,
            user: currentUserId,
            project: projectId,
            rating,
          })
        );
      }
      await dispatch(updateRating(projectId));
      setCommentContent("");
      setRating(0);
      setPushComment(true);
    } else {
      alert("You must be logged in to post a comment");
    }
  };

  const handleLike = async (commentId) => {
    await dispatch(likeComment(commentId));
    setPushComment(true);
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <form className="mb-6" onSubmit={handleCommentSubmit}>
        <textarea
          className="w-full p-2 border rounded-lg shadow-sm focus:ring focus:ring-indigo-300"
          placeholder="Add a comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          required
        ></textarea>
        <div className="flex space-x-1 mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <CiStar
              key={star}
              className={`w-8 h-8 cursor-pointer ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg mt-2 shadow-md hover:bg-indigo-600 transition"
        >
          Submit
        </button>
      </form>

      <div className="comments grid grid-cols-1 md:grid-cols-2 gap-4">
        {allCommentsForProject.length > 0 ? (
          allCommentsForProject.map((comment) => (
            <div
              key={comment._id}
              className="comment bg-gray-100 p-6 rounded-lg mb-4 shadow-md"
            >
              <div
                className="flex items-center mb-4 cursor-pointer"
                onClick={() => navigate(`/profile/${comment.user._id}`)}
              >
                <img
                  src={comment.user.photo}
                  alt="User"
                  className="w-10 h-10 rounded-full mr-4"
                />
                <div>
                  <p className="text-gray-800 font-semibold">
                    {comment.user.userName}
                  </p>
                  <p className="text-gray-600">{comment.rating} ★</p>
                </div>
              </div>
              <div className="flex justify-between">
                <p className="text-gray-800 font-bold">"{comment.content}"</p>
                {comment.user._id === currentUserId && (
                  <button
                    onClick={() => {
                      setCommentContent(comment.content);
                      setRating(comment.rating);
                    }}
                    className="text-blue-500 mt-2"
                  >
                    <CiPen />
                  </button>
                )}
              </div>
              <p className="text-gray-700">
                <span className="text-gray-500 text-sm">
                  Published: {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </p>
              <div className="flex items-center">
                <AiFillLike
                  className={`w-6 h-6 cursor-pointer ${
                    comment.likes && comment.likes.includes(currentUserId)
                      ? "text-blue-500"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleLike(comment._id)}
                />
                <span className="ml-2">{comment.likes?.length || 0}</span>
              </div>
            </div>
          ))
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
