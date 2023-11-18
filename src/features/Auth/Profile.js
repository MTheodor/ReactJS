import { useAuthContext } from '../Auth/AuthContext';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styles from './Profile.module.css';

export function Profile() {
  const [profile, setProfiles] = useState(null);
  const { accessToken, logout } = useAuthContext();

  const { userId } = useParams();
  const navigate = useNavigate();

  //For the rendering the profile
  useEffect(() => {
    fetch(`http://localhost:3005/users/` + userId, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfiles(data));
  }, [accessToken, userId]);

  if (!profile) {
    return <strong>Loading ...</strong>;
  }

  // For deleting the profile
  async function handleDeleteProfile(e) {
    e.preventDefault();
    const res = window.confirm(`Do you really want to delete this profile?`);
    if (!res) {
      return;
    }

    await fetch('http://localhost:3005/users/' + userId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    logout();
    navigate('/');
  }

  return (
    <>
      <div className={styles['position']}>
        <div className={styles['box']}>
          <h1 className={styles['header']}>Hello, {profile.firstName}!</h1>
          <p>First name: {profile.firstName}</p>
          <p>Last name: {profile.lastName}</p>
          <p>Email: {profile.email}</p>
          <div className={styles['buttons']}>
            <button onClick={handleDeleteProfile} className={styles['btn']}>
              Delete
            </button>
            <Link to={`/profile/edit/${profile.id}`} className={styles['btn']}>
              Edit
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
