import { useAuthContext } from '../Auth/AuthContext';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Edit.module.css';

export function EditOwnGame() {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);

  const [values, setValues] = useState({
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

  const { accessToken, user } = useAuthContext();

  //For the data you already had
  useEffect(() => {
    fetch('http://localhost:3005/games/' + gameId)
      .then((res) => res.json())
      .then((data) => setGame(data));
  }, [gameId]);

  useEffect(() => {
    fetch('http://localhost:3005/games/' + gameId)
      .then((res) => res.json())
      .then((data) => setValues(data));
  }, [gameId]);

  if (!game) {
    return <strong>Loading...</strong>;
  }

  // For changing the blank spaces
  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('http://localhost:3005/games/' + gameId, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    setMessage('The game was edited successfully');
  }

  return (
    <>
      {user && (
        <>
          <h1 className={styles['header']}>Edit Game</h1>
          <form onSubmit={handleSubmit}>
            {message && <p className={styles['message']}>{message}</p>}

            <p className="mt-1">
              <label htmlFor="name" className={styles['blocked']}>
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                onChange={handleInputChange}
                required
              />
            </p>

            <p className="mt-1">
              <label htmlFor="rating" className={styles['blocked']}>
                Rating:
              </label>
              <input
                type="number"
                name="rating"
                id="rating"
                value={values.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step=".01"
                required
              />
            </p>

            <p className="mt-1">
              <label htmlFor="background_image" className={styles['blocked']}>
                Poster:
              </label>
              <input
                type="url"
                name="background_image"
                id="background_image"
                value={values.background_image}
                onChange={handleInputChange}
                required
              />
            </p>

            <p className="mt-1">
              <label htmlFor="description_raw" className={styles['blocked']}>
                Description:
              </label>
              <textarea
                type="text"
                name="description_raw"
                id="description_raw"
                value={values.description_raw}
                onChange={handleInputChange}
                required
              />
            </p>

            {/* <div className="mt-1">
          <p>Developers:</p>
          <div>{numberedPages(377213, 10)}</div>
          {results.map((result) => (
            <p key={result.name}>
              <input
                type="checkbox"
                name="developers"
                id={result.name}
                value={result.name}
              />
              <label htmlFor={result.name}>{result.name}</label>
            </p>
          ))}
        </div> */}

            <p className="mt-1">
              <label htmlFor="developers" className={styles['blocked']}>
                Developers:
              </label>
              <input
                className={styles['long']}
                type="text"
                name="developers"
                id="developers"
                value={values.developers}
                onChange={handleInputChange}
                required
              />
            </p>

            <p className="mt-1">
              <label htmlFor="genres" className={styles['blocked']}>
                Genres:
              </label>
              <input
                className={styles['long']}
                type="text"
                name="genres"
                id="genres"
                value={values.genres}
                onChange={handleInputChange}
                required
              />
            </p>

            <p className="mt-1">
              <label htmlFor="tags" className={styles['blocked']}>
                Tags:
              </label>
              <input
                className={styles['long']}
                type="text"
                name="tags"
                id="tags"
                value={values.tags}
                onChange={handleInputChange}
                required
              />
            </p>

            <p className="mt-1">
              <label htmlFor="platforms" className={styles['blocked']}>
                Platforms:
              </label>
              <input
                className={styles['long']}
                type="text"
                name="platforms"
                id="plaforms"
                value={values.platforms}
                onChange={handleInputChange}
                required
              />
            </p>

            <p className="mt-1">
              <label htmlFor="released" className={styles['blocked']}>
                Release Date:
              </label>
              <input
                type="date"
                name="released"
                id="released"
                value={values.released}
                onChange={handleInputChange}
                required
              />
            </p>

            <p className="mt-1">
              <button className={styles['btn']}>Edit Game</button>
            </p>
          </form>
        </>
      )}
    </>
  );
}
