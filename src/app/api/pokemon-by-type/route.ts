export const revalidate = 240; // Cache this route for 60 seconds

import { TypeListPokemons } from "@/lib/features/pokemon/pokemon.model";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import pLimit from "p-limit";

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

  const results = await Promise.all(
    typeData.pokemon.map(async ({ pokemon }) => {
      const detail = await fetch(`${baseUrl}pokemon/${pokemon.name}`, {
        next: { revalidate: 120 },
      }).then((r) => r.json());
      return { ...detail, type };
    })
  );

  // const limit = pLimit(3); // only X requests at a time

  // const typeData: TypeListPokemons = await fetch(`${baseUrl}type/${type}`).then(
  //   (r) => r.json()
  // );

  // const results = await Promise.all(
  //   typeData.pokemon.map(({ pokemon }) =>
  //     limit(async () => {
  //       const detail = await fetch(`${baseUrl}pokemon/${pokemon.name}`).then(
  //         (r) => r.json()
  //       );
  //       return { ...detail, type };
  //     })
  //   )
  // );

  // console.log("results", results);

  // return NextResponse.json(results, {
  //   headers: {
  //     "Cache-Control": "public, max-age=60, stale-while-revalidate=120",
  //   },
  // });
  return NextResponse.json(results);
}
