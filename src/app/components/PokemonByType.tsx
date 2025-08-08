// import { useGetPokemonsDetailQuery } from "@/lib/features/pokemon/pokemonDetailsSlice";
import { PokemonCompleteInfo } from "@/lib/features/pokemon/pokemon.model";
import { useGetPokemonByTypeQuery } from "@/lib/features/pokemon/pokemonSlice";
import { AgGridReact } from "ag-grid-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import {
  AllCommunityModule,
  ColDef,
  colorSchemeDark,
  iconSetMaterial,
  ModuleRegistry,
  themeMaterial,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const PokeImageRenderer = (props: { value: { front_default: string } }) => {
  const { front_default } = props.value;
  return (
    front_default && (
      <Image
        src={front_default}
        alt={`Poke Image`}
        width={80}
        height={80}
        quality={20}
      />
    )
  );
};

export const PokemonByType = ({ type }: { type: string }) => {
  const { data, isLoading } = useGetPokemonByTypeQuery(type);
  // const { data, error, isLoading } = useGetPokemonsDetailQuery(type);

  const [columnDefs] = useState<ColDef[]>([
    { field: "id" },
    { field: "name" },
    {
      headerName: "sprites",
      field: "sprites",
      // valueGetter: (s: { front_default: any }) => s.front_default,
      cellRenderer: PokeImageRenderer,
      // cellRenderer: (props) => PokeImageRenderer,
      // cellRenderer: props => {
      //   // put the value in bold
      //   return <>Value is <b>{params.value}</b></>;
      // }
    },
  ]);

  const [_, setRowData] = useState<PokemonCompleteInfo[]>([]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
    };
  }, []);

  const myTheme = themeMaterial
    .withPart(iconSetMaterial)
    .withPart(colorSchemeDark)
    .withParams({
      rowHoverColor: "rgba(187, 136, 255, 1)",
      backgroundColor: "transparent",
      headerHeight: "5rem",
      headerTextColor: "white",
      headerBackgroundColor: "transparent",
      headerCellHoverBackgroundColor: "rgba(80, 40, 140, 0.66)",
      headerCellMovingBackgroundColor: "rgb(80, 40, 140)",
      // pickerButtonBackgroundColor: "hsla(0, 0%, 12%, 1.00)",
      pickerListBackgroundColor: "hsla(0, 0%, 12%, 1.00)",
    });

  useEffect(() => {
    document.documentElement.style.setProperty("--ag-spacing", `1rem`);
  }, []);

  useEffect(() => {
    if (!isLoading && data && data.length > 0) {
      setRowData(data);
    }
  }, [isLoading, data]);

  return (
    <>
      <div className="flex flex-col h-full">
        <AgGridReact
          domLayout="autoHeight"
          theme={myTheme}
          rowData={data}
          loading={isLoading}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[5, 10, 20, 30, 50]}
        ></AgGridReact>
      </div>
      {/* {data?.map((pokemon, index) => (
            <div key={index} className="grid grid-flow-col grid-cols-3 gap-4">
              <div>{pokemon.id}</div>
              <div>{pokemon.name}</div>
              <div>
                {pokemon.sprites.front_default && (
                  <Image
                    src={pokemon.sprites.front_default}
                    alt={pokemon.name}
                    width={80}
                    height={80}
                    quality={20}
                  />
                )}
              </div>
            </div>
          ))} */}
    </>
  );
};
