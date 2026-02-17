"use client"; // while working with NextJS, using React hooks, this needs to be placed to work
import { Dialog } from "@/app/components/Dialog";
import { PokemonInfoDialog } from "@/app/components/PokemonInfoDialog";
import { isShowDialog } from "@/lib/features/dialog/dialogSlice";
import { pokemonDetail } from "@/lib/features/pokemon/pokemonDetailsSlice";
import Link from "next/link";
import { use } from "react";
import { useSelector } from "react-redux";
import { PokemonByType } from "../../components/PokemonByType";

interface Props {
  params: Promise<{ type: string }>;
}

export default function TypesPage({ params }: Props) {
  const { type } = use(params);
  const isDialogOpen = useSelector(isShowDialog);
  const pokeDetail = useSelector(pokemonDetail);

  return (
    <>
      <div className={`flex flex-col mx-4 ${isDialogOpen && "blur-xs"}`}>
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
          <PokemonByType type={type} />
        </div>
      </div>
      <Dialog show={isDialogOpen}>
        {pokeDetail && (
          <PokemonInfoDialog
            id={pokeDetail.id}
            name={pokeDetail.name}
            height={pokeDetail.height}
            species={pokeDetail.species.name}
            type={pokeDetail.type}
            weight={pokeDetail.weight}
            defaultSprite={pokeDetail.sprites.front_default}
            abilities={pokeDetail.abilities}
          />
        )}
      </Dialog>
    </>
  );
}
