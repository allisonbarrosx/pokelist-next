"use client";
import { useGetPokemonTypesQuery } from "@/lib/features/pokemon/pokemonSlice";
import Link from "next/link";

export const PokemonTypes = () => {
  const { data, isLoading } = useGetPokemonTypesQuery();

  return (
    <>
      {isLoading ? (
        <p>Loaing...</p>
      ) : (
        <ul>
          {data?.map((type, index) => (
            <li key={index}>
              <Link href={`/types/${type.name}`}>{type.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
