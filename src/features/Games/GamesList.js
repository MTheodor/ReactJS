import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { GameCard } from './GameCard';
import styles from './Games.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

export function GamesList() {
  const [results, setGames] = useState(null);
  const [values, setValues] = useState({
    name: '',
  });

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

  //For searching a game
  // let string;
  // let ok = 1;
  // let api = `https://api.rawg.io/api/games?key=ccbacced90cb4c02a43b3de1bb718b6a&page=${currentPage}`;
  // if (string === '' || string === undefined) {
  //   api = `https://api.rawg.io/api/games?key=ccbacced90cb4c02a43b3de1bb718b6a&page=${currentPage}`;
  //   console.log('Game not found.');
  //   ok = 1;
  // } else {
  //   api = `https://api.rawg.io/api/games/${string}?key=ccbacced90cb4c02a43b3de1bb718b6a`;
  //   ok = 2;
  // }

  //For pagination
  const numberedPages = (currentPage) => {
    let content = [];

    if (currentPage > 1)
      content.push(
        <div key={'prevBotn'} className={styles['prevBtn']}>
          {
            <Link key={'prev'} to={`/${currentPage - 1}`}>
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
          <Link key={`${i}`} to={`/${i}`}>
            {i}
          </Link>
        </div>
      );
    }

    if (currentPage < noPages)
      content.push(
        <div key={'nextBotn'} className={styles['nextBtn']}>
          {
            <Link key={'next'} to={`/${currentPage + 1}`}>
              {'Next>>'}
            </Link>
          }
        </div>
      );

    return content;
  };

  //For the rendering of the games
  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?key=ccbacced90cb4c02a43b3de1bb718b6a&page=${currentPage}`
    )
      .then((res) => res.json())
      .then((data) => setGames(data.results));
  }, [currentPage]);

  if (!results) {
    return <strong>Loading ...</strong>;
  }

  //For the search function
  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  // string = values.name;

  // function search(e) {
  //   e.preventDefault();
  //   function makeSlug(str) {
  //     str = str
  //       .toLowerCase()
  //       .trim()
  //       .replace(/[^\w\s-]/g, '')
  //       .replace(/[\s_-]+/g, '-')
  //       .replace(/^-+|-+$/g, '');
  //     string = str;
  //   }

  //   makeSlug(string);
  // }

  return (
    <div className={styles['container']}>
      {/* Search bar */}
      <form className={styles['searchBar']}>
        <button>
          <FontAwesomeIcon icon={solid('magnifying-glass')} />{' '}
        </button>
        <input
          type="text"
          placeholder="Search for a game"
          name="name"
          id="name"
          value={values.name}
          onChange={handleInputChange}
        />
      </form>

      {/* Game cards */}
      <div className={styles['game-list']}>
        {results.map((result) => (
          <GameCard key={result.id} game={result} page={currentPage} />
        ))}
        {/* Pagination Menu */}
        <div className={styles['pagination']}>{numberedPages(currentPage)}</div>
      </div>
    </div>
  );
}
