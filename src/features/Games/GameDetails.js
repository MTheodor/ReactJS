import { useAuthContext } from '../Auth/AuthContext';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import styles from './GameDetails.module.css';

export function GameDetails() {
  //For rendering the game
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  const { user } = useAuthContext();
  const { accessToken } = useAuthContext();

  //For adding a game to favorites
  const [values] = useState({
    name: '',
    background_image: '',
    description_raw: '',
    developers: '',
    genres: '',
    platforms: '',
    rating: '',
    released: '',
    tags: '',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games/${gameId}?key=ccbacced90cb4c02a43b3de1bb718b6a`
    )
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, [gameId]);

  if (!game) {
    return <strong>Loading...</strong>;
  }

  //For adding to favorites
  let enumeratedElements = '';

  values.name = game.name;
  values.background_image = game.background_image;
  values.description_raw = game.description_raw;
  Enumeration(game.developers);
  values.developers = enumeratedElements;
  Enumeration(game.genres);
  values.genres = enumeratedElements;
  Enumerations(game.platforms);
  values.platforms = enumeratedElements;
  values.rating = game.rating;
  values.released = game.released;
  Enumeration(game.tags);
  values.tags = enumeratedElements;

  async function handleFavorite(e) {
    e.preventDefault();
    await fetch('http://localhost:3005/games', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ ...values, userId: user.id }),
    }).then((res) => res.json());

    setMessage('The game was added successfully');
  }

  //For multiple elements from an object
  function Enumeration(x) {
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

  function Enumerations(x) {
    let elements = x;
    enumeratedElements = '';

    for (const element of elements) {
      if (enumeratedElements === '') {
        enumeratedElements = enumeratedElements + element.platform.name;
      } else {
        enumeratedElements = enumeratedElements + ', ' + element.platform.name;
      }
    }
  }

  return (
    <>
      {/* Succes message */}
      {message && <p className={styles['message']}>{message}</p>}

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

      {/* For adding to favorites */}
      {user && (
        <div className={styles['favBtn']}>
          <button onClick={handleFavorite} className={styles['btn']}>
            Add to favorites
          </button>
        </div>
      )}
    </>
  );
}
