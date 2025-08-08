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
        <div className="flex flex-wrap gap-4">
          {data?.map((type, index) => (
            <div
              key={index}
              className="p-5 md:p-10 bg-zinc-900/90 shadow-lg rounded-lg flex-1 flex flex-col justify-center w-auto md:w-100"
            >
              <p className="text-center mb-2 capitalize text-shadow-md">
                {type.name}
              </p>
              <Link
                href={`/types/${type.name}`}
                className="rounded-xl bg-violet-950 hover:bg-violet-500 shadow-sm px-4 py-3 text-nowrap text-center"
              >
                See Pokémons
              </Link>
              <Link
                href={`/types/${type.name}/self`}
                className="rounded-xl bg-violet-950 hover:bg-violet-500 shadow-sm px-4 py-3 text-nowrap text-center mt-2"
              >
                See Pokémons Self API
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
