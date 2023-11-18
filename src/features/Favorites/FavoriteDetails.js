import { useAuthContext } from '../Auth/AuthContext';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './FavoriteDetails.module.css';

export function FavoriteDetails() {
  //For rendering the game
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = useAuthContext();

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3005/games/' + gameId, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, [gameId, accessToken]);

  if (!game) {
    return <strong>Loading...</strong>;
  }

  //For multiple elements from an object
  let enumeratedElements = '';

  function Enumeration(x) {
    if (typeof x === 'string') {
      enumeratedElements = x;
    } else {
      let elements = x;
      enumeratedElements = '';

      for (const element of elements) {
        if (enumeratedElements === '') {
          enumeratedElements = enumeratedElements + element.name;
        } else {
          enumeratedElements = enumeratedElements + ', ' + element.name;
        }
      }
    }
  }

  function Enumerations(x) {
    if (typeof x === 'string') {
      enumeratedElements = x;
    } else {
      let elements = x;
      enumeratedElements = '';

      for (const element of elements) {
        if (enumeratedElements === '') {
          enumeratedElements = enumeratedElements + element.platform.name;
        } else {
          enumeratedElements =
            enumeratedElements + ', ' + element.platform.name;
        }
      }
    }
  }

  // For deleting a game
  async function handleDeleteGame(e) {
    e.preventDefault();
    const res = window.confirm(
      `Do you really want to delete the game "${game.name}"?`
    );
    if (!res) {
      return;
    }

    await fetch('http://localhost:3005/games/' + gameId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    navigate('/favorites');
  }

  return (
    <>
      {user && (
        <>
          {/* For the header */}
          <div className={styles['header']}>
            <div>
              <h1 className="text-3xl font-bold">{game.name}</h1>
            </div>
            <p style={{ color: '#bada55' }}>
              <FontAwesomeIcon icon={regular('star')} />{' '}
              <strong>{game.rating} / 5</strong>
            </p>
          </div>
          {/* For the details */}
          <div className={styles['container']}>
            <div className={styles['image']}>
              <img src={game.background_image} alt={`${game.name} Poster`} />
            </div>

            <div className={styles['details']}>
              <div className={styles['components']}>
                <h4>Developer(s):</h4>
                <p>
                  {Enumeration(game.developers)}
                  {enumeratedElements}
                </p>
              </div>

              <div className={styles['components']}>
                <h4>Release date:</h4>
                <p>{game.released}</p>
              </div>

              <div className={styles['components']}>
                <h4>Genres:</h4>
                <p>
                  {Enumeration(game.genres)}
                  {enumeratedElements}
                </p>
              </div>

              <div className={styles['components']}>
                <h4>Tags:</h4>
                <p>
                  {Enumeration(game.tags)}
                  {enumeratedElements}
                </p>
              </div>

              <div className={styles['components']}>
                <h4>Platforms:</h4>
                <p>
                  {Enumerations(game.platforms)}
                  {enumeratedElements}
                </p>
              </div>
            </div>
          </div>
          <div className={styles['description']}>
            <p>{game.description_raw}</p>
          </div>

          {/* For the edit or delete */}
          {
            <div className={styles['delete_edit']}>
              <div className={styles['delete']}>
                <button onClick={handleDeleteGame}>Delete Game</button>{' '}
              </div>

              <div className={styles['edit']}>
                <Link to={`/favorites/edit/${game.id}`}>Edit this game</Link>
              </div>
            </div>
          }
        </>
      )}
    </>
  );
}
