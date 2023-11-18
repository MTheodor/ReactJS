import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { FavoriteCard } from '../Favorites/FavoriteCard';
import styles from './Favorite.module.css';

import { useAuthContext } from '../Auth/AuthContext';

export function Favorites() {
  const [games, setGames] = useState(null);
  const { user, accessToken } = useAuthContext();

  //For current page
  let { currentPage } = useParams();
  if (currentPage === undefined) {
    currentPage = 1;
  }
  currentPage = Number(currentPage);

  //For the number of pages
  let noGames = 786495;
  noGames = Number(noGames);

  let gamesPerPage = 20;
  gamesPerPage = Number(gamesPerPage);

  let noPages = Math.ceil(noGames / gamesPerPage);

  //For pagination
  const numberedPages = (currentPage) => {
    let content = [];

    if (currentPage > 1)
      content.push(
        <div key={'prevBotn'} className={styles['prevBtn']}>
          {
            <Link key={'prev'} to={`/favorites/${currentPage - 1}`}>
              {'<<Prev'}
            </Link>
          }
        </div>
      );

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i <= 0) {
        continue;
      }

      if (i > noPages) {
        break;
      }
      content.push(
        <div key={`Btn${i}`} className={styles['numberedBtn']}>
          <Link key={i} to={`/favorites/${i}`}>
            {i}
          </Link>
        </div>
      );
    }

    if (currentPage < noPages)
      content.push(
        <div key={'nextBotn'} className={styles['nextBtn']}>
          {
            <Link key={'next'} to={`/favorites/${currentPage + 1}`}>
              {'Next>>'}
            </Link>
          }
        </div>
      );

    return content;
  };

  //For the rendering of the games
  useEffect(() => {
    fetch(`http://localhost:3005/games?_page=${currentPage}`, {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setGames(data));
  }, [currentPage, accessToken]);

  if (!games) {
    return <strong>Loading ...</strong>;
  }

  return (
    <>
      {user && (
        <>
          <div className={styles['container']}>
            {/* Search bar
      <div className={styles['searchBar']}>
        <button>
          <FontAwesomeIcon icon={solid('magnifying-glass')} />{' '}
        </button>
        <input type="text" placeholder="Search for a game" />
      </div> */}

            <div className={styles['game-list']}>
              {/* Game posters */}
              {games.map((game) => (
                <FavoriteCard key={game.id} game={game} page={currentPage} />
              ))}
              <div className={styles['iGiveUp']}>
                {/* Add own game */}
                <div className={styles['iGiveUp']}>
                  <Link to="/favorites/add" className={styles['addBtn']}>
                    <p className={styles['btn']}>
                      {' '}
                      <FontAwesomeIcon icon={solid('circle-plus')} /> Add Game
                    </p>
                  </Link>
                </div>

                {/* Pagination */}
                <div className={styles['pagination']}>
                  {numberedPages(currentPage)}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
