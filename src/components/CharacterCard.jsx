import { Link } from "react-router-dom";

export default function CharacterCard({ character }) {
  return (
    <div className="card">
      <img className="avatar" src={character.image} alt={character.name} />

      <h3 className="cardTitle">{character.name}</h3>

      <div className="meta">
        <div>
          <b>Status:</b> {character.status}
        </div>
        <div>
          <b>Species:</b> {character.species}
        </div>
      </div>

      <Link className="btn" to={`/characters/${character.id}`}>
        View Details
      </Link>
    </div>
  );
}