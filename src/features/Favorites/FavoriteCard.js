import { Link } from 'react-router-dom';

export function FavoriteCard({ game, page }) {
  return (
    <div>
      <Link to={`/favorites/${page}/${game.id}`}>
        <img
          className="poster"
          src={game.background_image}
          alt={`${game.name} poster`}
        />
      </Link>
      <h2>{game.name}</h2>
    </div>
  );
}
