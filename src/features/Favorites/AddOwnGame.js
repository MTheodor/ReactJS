import { useState } from 'react';
import { useAuthContext } from '../Auth/AuthContext';

import styles from './Add.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export function AddOwnGame() {
  // const [results, setGames] = useState(null);
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

  // //For developers (Failed attempt)
  // let devPage;
  // if (devPage === undefined) {
  //   devPage = 1;
  // }
  // devPage = Number(devPage);

  // useEffect(() => {
  //   fetch(
  //     `https://api.rawg.io/api/developers?key=ccbacced90cb4c02a43b3de1bb718b6a&page=${devPage}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setGames(data.results));
  // }, [devPage]);

  // if (!results) {
  //   return <strong>Loading ...</strong>;
  // }

  //For pagination
  // const numberedPages = (noElements, noElementsPerPage) => {
  //   let content = [];
  //   noElements = Number(noElements);
  //   noElementsPerPage = Number(noElementsPerPage);

  //   function increase() {
  //     devPage++;
  //   }

  //   function decrease() {
  //     devPage--;
  //   }

  //   let noPages = Math.ceil(noElements / noElementsPerPage);

  //   if (devPage > 1) content.push(<span onClick={decrease}>{'<<Prev'}</span>);

  //   if (devPage < noPages)
  //     content.push(<span onClick={increase}>{'Next>>'}</span>);

  //   return content;
  // };

  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
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

  return (
    <>
      {user && (
        <>
          <h1 className={styles['header']}>
            <FontAwesomeIcon icon={solid('circle-plus')} /> Add Game
          </h1>
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
              <button className={styles['btn']}>Add Game</button>
            </p>
          </form>
        </>
      )}
    </>
  );
}
