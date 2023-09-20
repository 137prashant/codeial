import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import Loader from '../components/Loader';
const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();

  console.log('UserProfile user ', userId);
  const auth = useAuth();

  useEffect(
    () => {
      const getUser = async () => {
        const response = await fetchUserProfile(userId);

        if (response.success) {
          setUser(response.data.user);
        } else {
          toast(response.message, {
            appearance: 'error',
          });
          return <Navigate to="/" />;
        }
        setLoading(false);
      };
      getUser();
    },
    [userId],
    Navigate,
    toast
  );
  if (loading) {
    return <Loader />;
  }
  if (!auth.user) {
    return <Navigate to="/login" />;
  }
  const checkIfUserIsFriend = () => {
    const friends = auth.user.friends;
    const friendIds = friends.map((friend) => friend.to_user._id);
    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }

    return false;
  };
  const handleRemoveFriend = async () => {
    setRequestInProgress(true);
    const response = await removeFriend(userId);
    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friendship) => friendship.to_user._id === userId
      );

      auth.updateUserFriends(false, friendship[0]);
      toast('UnFriend Successfully', {
        appearance: 'success',
      });
    } else {
      toast(response.message, {
        appearance: 'error',
      });
    }

    setRequestInProgress(false);
  };
  const handleAddFriend = async () => {
    setRequestInProgress(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      toast('Friend add successfully', {
        appearance: 'success',
      });
    } else {
      toast(response.message, {
        appearance: 'error',
      });
    }

    setRequestInProgress(false);
  };
  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/2922/2922506.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriend}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Removing Friend' : 'Remove Friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriend}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding Friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
