import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
        .then((res) => res.json()),
    enabled: !!pokemonName.trim(), 
  });

  return (
    <div className="pokemon-container">
      <h2>Search Pokemon</h2>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />

      {isError && <h1>Sorry, there is an error</h1>}
      {isLoading && <h1>Loading...</h1>}

      {data && !data.detail && (
        <div>
          <h3>{data.name}</h3>
          <img src={data.sprites.front_default} alt={data.name} width="150" />
          <p>Height: {data.height}</p>
          <p>Weight: {data.weight}</p>
          <p>Types: {data.types.map((type) => type.type.name)}</p>
        </div>
      )}

      {data?.detail && <p>Pokemon not found.</p>}
    </div>
  );
};
