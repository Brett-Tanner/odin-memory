import { cachedPokemon } from "../pokemon";

export function PokemonCard({ src, name, clicked }: cachedPokemon) {
  return (
    <button
      className="flex flex-col gap-3 p-3 justify-center items-center border-4 border-neutral-100 rounded-xl bg-blue-500"
      type="button"
    >
      <img src={src ? src : ""} alt={nameCase(name)} />
      <p>{nameCase(name)}</p>
      <p>{clicked ? "clicked" : "not clicked"}</p>
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
