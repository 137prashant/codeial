import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import styles from '../styles/home.module.css';
import Comment from './Comment';

import { Link } from 'react-router-dom';
import { useState } from 'react';
import { createComment, toggleLike } from '../api';
import { usePost } from '../hooks';

const Post = ({ post }) => {
  const [comments, setComments] = useState('');
  const [addingComment, setAddingComment] = useState(false);
  const posts = usePost();
  const handelAddComment = async (e) => {
    if (e.key === 'Enter') {
      setAddingComment(true);
      const response = await createComment(comments, post._id);
      if (response.success) {
        setComments('');
        posts.addCommentToPost(response.data.comment, post._id);
        toast('Comment added successfully', {
          appearance: 'success',
        });
      } else {
        toast(response.message, {
          appearance: 'error',
        });
      }
      setAddingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    console.log('post._id', post._id);
    const response = await toggleLike(post._id, 'Post');
    if (response.success) {
      if (response.data.deleted) {
        toast('Post unlike successfully', {
          appearance: 'success',
        });
      } else {
        toast('Post liked successfully', {
          appearance: 'success',
        });
      }
    } else {
      toast(response.message, {
        appearance: 'error',
      });
    }
  };
  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
            alt="user-pic"
          />
          <div>
            <Link to={`/user/${post.user._id}`} className={styles.postAuthor}>
              {post.user.name}
            </Link>
            <span className={styles.postTime}>a minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            onKeyDown={handelAddComment}
            disabled={addingComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment key={`comment-${comment._id}`} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};
export default Post;
