import Image from "next/image";

const DisplayInfo = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  return (
    <div className="flex mb-2">
      <span className="w-60 shrink font-bold">{label}:</span>
      <span className="w-120 grow">{value}</span>
    </div>
  );
};

interface PokemonInfoDialogParams {
  id: number;
  name: string;
  height: number;
  abilities: { ability: { name: string } }[];
  defaultSprite?: string;
  species: string;
  weight: number;
  type: string;
}

export const PokemonInfoDialog = ({
  id,
  name,
  height,
  abilities,
  defaultSprite,
  species,
  weight,
  type,
}: PokemonInfoDialogParams) => {
  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Pokémon Info</h1>
      <div className="grid grid-cols-7 gap-4">
        <div className="col-span-7 md:col-span-4">
          <DisplayInfo label="ID" value={id} />
          <DisplayInfo label="Name" value={name} />
          <DisplayInfo label="Height" value={height} />
          <DisplayInfo label="Species" value={species} />
          <DisplayInfo label="Weight" value={weight} />
          <DisplayInfo label="Type" value={type} />
          <h1 className="text-xl font-semibold my-4">Abilities</h1>
          {abilities &&
            abilities.map((ability, index) => (
              <p className="capitalize" key={index}>
                - {ability.ability.name}
              </p>
            ))}
        </div>
        <div className="col-span-7 md:col-span-3 flex justify-center items-start">
          {defaultSprite && (
            <Image
              src={defaultSprite}
              alt={name}
              width={250}
              height={250}
              quality={100}
            />
          )}
        </div>
      </div>
    </>
  );
};
