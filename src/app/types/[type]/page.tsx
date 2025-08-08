"use client";
import { use } from "react";
import { PokemonByType } from "../../components/PokemonByType";

interface Props {
  params: Promise<{ type: string }>;
}

export default function TypesPage({ params }: Props) {
  const { type } = use(params);

  return (
    <div>
      <p>TYPESS</p>
      <a href="/">Home</a>
      <div className="m-5">
        <PokemonByType type={type} />
      </div>
    </div>
  );
}
