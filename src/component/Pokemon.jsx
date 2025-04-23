import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

export const Pokemon = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [search, setSearch] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemon', search],
    queryFn: () =>
      fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then((res) => res.json()),
    enabled: !!search, 
  });

  const handleSearch = () => {
    setSearch(pokemonName); 
  };

  if (isError) {
    return <h1>Sorry, there is an error</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
return (
  <div className="pokemon-container">
    <h2>Search Pokemon</h2>
    <div>
      <input
        type="text"
        value={pokemonName}
        onChange={(e) => setPokemonName(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>

    {data && (
      <div>
        <h3>{data.name}</h3>
        <img src={data.sprites.front_default} alt={data.name} width="150" />
        <p>Height: {data.height}</p>
        <p>Weight: {data.weight}</p>
        <p>Types: {data.types.map((type) => type.type.name).join(', ')}</p>
      </div>
    )}
  </div>
);

};
