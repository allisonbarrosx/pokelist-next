import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PokemonCompleteInfo } from "./pokemon.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const initialState: { detail: PokemonCompleteInfo | null } = {
  detail: null,
};

export const pokemonDetailsSlice = createSlice({
  name: "pokemonDetail",
  initialState,
  reducers: (creator) => ({
    setPokemonInfo: creator.reducer(
      (state, action: PayloadAction<PokemonCompleteInfo>) => {
        state.detail = action.payload;
      }
    ),
  }),
  selectors: {
    pokemonDetail: (state) => state.detail,
  },
});

export const { setPokemonInfo } = pokemonDetailsSlice.actions;
export const { pokemonDetail } = pokemonDetailsSlice.selectors;
