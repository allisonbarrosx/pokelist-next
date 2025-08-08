"use client";
import { use } from "react";
import { PokemonByType } from "../../components/PokemonByType";
import Link from "next/link";

interface Props {
  params: Promise<{ type: string }>;
}

export default function TypesPage({ params }: Props) {
  const { type } = use(params);

  return (
    <div>
      <p>TYPESS</p>
      <Link href="/">Home</Link>
      <div className="m-5">
        <PokemonByType type={type} />
      </div>
    </div>
  );
}
