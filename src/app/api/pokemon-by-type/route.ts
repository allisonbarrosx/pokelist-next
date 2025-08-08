export const revalidate = 240; // Cache this route for 60 seconds

import {
  PokemonCompleteInfo,
  TypeListPokemons,
} from "@/lib/features/pokemon/pokemon.model";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
// import pLimit from "p-limit";

const baseUrl = "https://pokeapi.co/api/v2/";

export async function GET(request: NextRequest) {
  const type = request.nextUrl.searchParams.get("type");

  if (!type) {
    return NextResponse.json(
      { error: "Missing 'type' query parameter" },
      { status: 400 }
    );
  }

  const typeData: TypeListPokemons = await fetch(`${baseUrl}type/${type}`, {
    next: { revalidate: 120 },
  }).then((r) => r.json());

  const BATCH_SIZE = 5;
  const results: PokemonCompleteInfo[] = [];
  const pokemons = (typeData as TypeListPokemons).pokemon;

  for (let i = 0; i < pokemons.length; i += BATCH_SIZE) {
    const batch = pokemons.slice(i, i + BATCH_SIZE);

    const batchResults = await Promise.all(
      batch.map(async ({ pokemon }) => {
        const detail = await fetch(`${baseUrl}pokemon/${pokemon.name}`, {
          next: { revalidate: 120 },
        }).then((r) => r.json());
        return { ...detail, type };
      })
    );

    results.push(...(batchResults.filter(Boolean) as PokemonCompleteInfo[]));

    await new Promise((r) => setTimeout(r, 1));
  }

  return NextResponse.json(results);
}
