import { useEffect, useState } from "react";
import { cachedPokemon, listResponse, pokemonResponse } from "./pokemon";
import { PokemonCard } from "./components/PokemonCard";
import { Score } from "./components/Score";

function App() {
  const [activePokemon, setActivePokemon] = useState<cachedPokemon[]>([]);
  const [score, setScore] = useState(0);
  const [pB, setPB] = useState(0);
  const [newGame, setNewGame] = useState(true);
  const problemChild = activePokemon.find((pokemon) => {
    return pokemon.clicked > 1;
  });

  // Get the initial list of urls for all pokemon
  useEffect(() => {
    let ignore = false;
    async function getPokemon() {
      const listResponse = await fetch(
        "https://pokeapi.co/api/v2/pokemon/?limit=20000"
      );
      const listData: listResponse = await listResponse.json();
      // Get list of urls for each available pokemon
      const urls = listData.results.map((endpoint) => {
        return endpoint.url;
      });

      // Choose 20 random ones to play with
      const randomPokemon: cachedPokemon[] = [];
      for (let i = 0; i < 20; i++) {
        await getRandomPokemon(urls, randomPokemon);
      }

      setActivePokemon(randomPokemon);
    }

    async function getRandomPokemon(
      urls: string[],
      randomPokemon: cachedPokemon[]
    ) {
      const url = urls[Math.floor(Math.random() * urls.length)];
      const pokemonResponse = await fetch(url);
      const pokemonData: pokemonResponse = await pokemonResponse.json();
      const pokemon = {
        id: pokemonData.id,
        name: pokemonData.name,
        src: pokemonData.sprites.front_default,
        clicked: 0,
      };

      if (
        pokemonData.sprites.front_default &&
        randomPokemon.every((p) => p.id !== pokemon.id)
      ) {
        randomPokemon.push(pokemon);
      } else {
        getRandomPokemon(urls, randomPokemon);
      }
    }

    if (newGame && !ignore) {
      getPokemon();
      setScore(0);
      setNewGame(false);
      return () => {
        ignore = true;
      };
    }
  }, [newGame]);

  if (problemChild) {
    return (
      <main className="h-full flex flex-col justify-center items-center gap-12 p-12">
        <Score score={score} pB={pB} />
        <h1 className="text-5xl font-bold text-blue-500 text-center col-span-5">
          You clicked {nameCase(problemChild.name)} twice!
        </h1>
        <PokemonCard
          pokemon={problemChild}
          activePokemon={activePokemon}
          setActivePokemon={setActivePokemon}
          score={score}
          setScore={setScore}
          pB={pB}
          setPB={setPB}
          key={problemChild.id}
        />
        <button
          type="button"
          onClick={() => setNewGame(true)}
          className="text-3xl p-3 border-4 border-neutral-100 rounded-xl bg-blue-500"
        >
          New Game
        </button>
      </main>
    );
  } else {
    return (
      <>
        <main className="grid grid-cols-5 gap-3 p-3">
          <Score score={score} pB={pB} />
          {activePokemon.map((pokemon) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                activePokemon={activePokemon}
                setActivePokemon={setActivePokemon}
                score={score}
                setScore={setScore}
                pB={pB}
                setPB={setPB}
                key={pokemon.id}
              />
            );
          })}
        </main>
      </>
    );
  }
}

function nameCase(string: string) {
  const wordArray = string.split("-");
  const upperArray = wordArray.map((word) => {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  });
  return upperArray.join(" ");
}

export default App;
