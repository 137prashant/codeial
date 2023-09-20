import PropTypes from 'prop-types';
import { getPosts } from '../api';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import Comment from '../components/Comment';
import styles from '../styles/home.module.css';
import { Link } from 'react-router-dom';
import { useAuth, usePost } from '../hooks';
import FriendsList from '../components/FriendList';
import CreatePost from '../components/CreatePost';
import Post from '../components/Post';
const Home = () => {
  const auth = useAuth();
  const posts = usePost();
  if (posts.loading) {
    return <Loader />;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
        <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
  );
};

Home.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Home;
