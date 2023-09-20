import { useState } from 'react';
import styles from '../styles/home.module.css';
import { toast } from 'react-toastify';
import { addPost } from '../api';
import { usePost } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);
  const posts = usePost();
  const handleAddPostClick = async () => {
    setAddingPost(true);
    // do some checks
    const response = await addPost(post);
    if (response.success) {
      toast('Post added successfully', {
        appearance: 'success',
      });
      setPost('');
      posts.addPostToState(response.data.post);
    } else {
      toast(response.message, {
        appearance: 'error',
      });
    }
    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />

      <div>
        <button
          className={styles.addPostBtn}
          onClick={handleAddPostClick}
          disabled={addingPost}
        >
          {addingPost ? 'Adding post...' : 'Add post'}
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
