import { SetStateAction } from "react";
import { cachedPokemon } from "../pokemon";

interface props {
  pokemon: cachedPokemon;
  activePokemon: cachedPokemon[];
  setActivePokemon: SetStateAction;
}

export function PokemonCard({
  pokemon,
  activePokemon,
  setActivePokemon,
}: props) {
  const handleClick = () => {
    const newPokemon = activePokemon.map((p) => {
      if (p.id === pokemon.id) {
        return { ...p, clicked: p.clicked + 1 };
      } else {
        return p;
      }
    });
    setActivePokemon(newPokemon);
  };

  return (
    <button
      className="flex flex-col gap-3 p-3 justify-center items-center border-4 border-neutral-100 rounded-xl bg-blue-500"
      type="button"
      onClick={handleClick}
    >
      <img src={pokemon.src ? pokemon.src : ""} alt={nameCase(pokemon.name)} />
      <p className="font-bold text-xl">{nameCase(pokemon.name)}</p>
      <p>{pokemon.clicked}</p>
    </button>
  );
}

function nameCase(string: string) {
  const wordArray = string.split("-");
  const upperArray = wordArray.map((word) => {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  });
  return upperArray.join(" ");
}
