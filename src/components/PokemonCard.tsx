import { cachedPokemon } from "../pokemon";

export function PokemonCard({ src, name, id, clicked }: cachedPokemon) {
  if (id) {
    return (
      <div>
        <img src={src ? src : ""} alt={name} />
        <p>{name}</p>
        <p>{clicked ? "clicked" : "not clicked"}</p>
      </div>
    );
  } else {
    return <div>Nothing yet</div>;
  }
}
