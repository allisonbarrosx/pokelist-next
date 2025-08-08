import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonCompleteInfo } from "./pokemon.model";

export const pokemonDetailsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  reducerPath: "pokemonDetailApi",
  // Tag types are used for caching and invalidation.
  tagTypes: ["PokemonDetails"],
  endpoints: (builder) => ({
    getPokemonsDetail: builder.query<PokemonCompleteInfo[], string>({
      query: (type) => `pokemon-by-type?type=${type}`,
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({
                type: "PokemonDetails" as const,
                id,
              })),
            ]
          : ["PokemonDetails"];
      },
    }),
  }),
});

export const { useGetPokemonsDetailQuery } = pokemonDetailsApiSlice;
