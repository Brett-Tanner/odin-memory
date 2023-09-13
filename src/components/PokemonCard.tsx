import { SetStateAction } from "react";
import { cachedPokemon } from "../pokemon";

interface props {
  pokemon: cachedPokemon;
  activePokemon: cachedPokemon[];
  setActivePokemon: SetStateAction;
  score: number;
  setScore: SetStateAction;
  pB: number;
  setPB: SetStateAction;
}

export function PokemonCard({
  pokemon,
  activePokemon,
  setActivePokemon,
  score,
  setScore,
  pB,
  setPB,
}: props) {
  const handleClick = () => {
    const newPokemon = activePokemon.map((p) => {
      if (p.id === pokemon.id) {
        return { ...p, clicked: p.clicked + 1 };
      } else {
        return p;
      }
    });
    const shuffledPokemon = shuffle(newPokemon);
    setActivePokemon(shuffledPokemon);
    if (pokemon.clicked < 1) {
      setScore(score + 1);
      if (score + 1 > pB) setPB(score + 1);
    }
  };

  return (
    <button
      className="flex flex-col gap-3 p-3 justify-center items-center border-4 border-neutral-100 rounded-xl bg-blue-500"
      type="button"
      onClick={handleClick}
    >
      <img src={pokemon.src ? pokemon.src : ""} alt={nameCase(pokemon.name)} />
      <p className="font-bold text-xl">{nameCase(pokemon.name)}</p>
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

function shuffle(array: cachedPokemon[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
