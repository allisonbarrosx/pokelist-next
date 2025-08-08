"use client";
import { use } from "react";
import Link from "next/link";
import { PokemonByTypeSelfApi } from "@/app/components/PokemonByTypeSelfApi";

interface Props {
  params: Promise<{ type: string }>;
}

export default function TypesPageSelf({ params }: Props) {
  const { type } = use(params);

  return (
    <div className="flex flex-col mx-4">
      <div className="m-auto justify-content-center mt-8">
        <h1 className="text-3xl">Pokemon By Types</h1>
      </div>
      <Link
        href="/"
        className="rounded-xl w-35 bg-violet-950 hover:bg-violet-500 shadow-sm px-8 py-3 text-nowrap text-center self-center my-4"
      >
        Home
      </Link>
      <div className="m-5">
        <PokemonByTypeSelfApi type={type} />
      </div>
    </div>
  );
}
