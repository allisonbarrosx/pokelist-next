"use client";

import { useGetPokemonTypesQuery } from "@/lib/features/pokemon/pokemonSlice";

export const PokemonTypes = () => {
  const { data, error, isLoading } = useGetPokemonTypesQuery();

  return (
    <>
      {isLoading ? (
        <p>Loaing...</p>
      ) : (
        <ul>
          {data?.map((type, index) => (
            <li key={index}>{type.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};
