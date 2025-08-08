// import { useGetPokemonsDetailQuery } from "@/lib/features/pokemon/pokemonDetailsSlice";
import { useGetPokemonByTypeQuery } from "@/lib/features/pokemon/pokemonSlice";
import Image from "next/image";

export const PokemonByType = ({ type }: { type: string }) => {
  const { data, error, isLoading } = useGetPokemonByTypeQuery(type);
  // const { data, error, isLoading } = useGetPokemonsDetailQuery(type);

  return (
    <>
      {isLoading ? (
        <p>Loaing...</p>
      ) : error ? (
        <p>error!</p>
      ) : (
        <div className="grid">
          {data?.map((pokemon, index) => (
            <div key={index} className="grid grid-flow-col grid-cols-3 gap-4">
              <div>{pokemon.id}</div>
              <div>{pokemon.name}</div>
              <div>
                <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
