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

const StackedPokemonRenderer = (props: { data: PokemonCompleteInfo }) => {
  const { name, id, sprites } = props.data || {};
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="flex justify-start gap-2">
        {sprites?.front_default && (
          <Image
            src={sprites.front_default}
            alt={`${name} image`}
            width={64}
            height={64}
            quality={40}
          />
        )}
        <div
          className="flex flex-col gap-2"
          style={{ minWidth: "150px", maxWidth: "150px" }}
        >
          <strong className="text-wrap">
            #{id} <span className="capitalize">{name}</span>
          </strong>
        </div>
      </div>
    </div>
  );
};

export const PokemonByType = ({ type }: { type: string }) => {
  const { data, isLoading } = useGetPokemonByTypeQuery(type);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const columnDefs = useMemo<ColDef[]>(() => {
    if (isMobile) {
      return [
        {
          headerName: "Pokémon",
          headerClass: "text-center",
          flex: 1,
          autoHeight: true,
          cellRenderer: StackedPokemonRenderer,
        },
      ];
    }
    return [
      { field: "id", flex: 1 },
      { field: "name", flex: 1 },
      {
        headerName: "Image",
        field: "sprites",
        flex: 1,
        cellRenderer: (props: { value: { front_default: string } }) => {
          const { front_default } = props.value || {};
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
        },
      },
    ];
  }, [isMobile]);

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      resizable: true,
      sortable: true,
    };
  }, [isMobile]);

  const myTheme = themeMaterial
    .withPart(iconSetMaterial)
    .withPart(colorSchemeDark)
    .withParams({
      rowHeight: "80px",
      spacing: ".25rem",
      rowHoverColor: "rgba(187, 136, 255, 1)",
      backgroundColor: "transparent",
      // headerHeight: isMobile ? 0 : "5rem",
      headerHeight: "5rem",
      headerTextColor: "white",
      headerBackgroundColor: "transparent",
      headerCellHoverBackgroundColor: "rgba(80, 40, 140, 0.66)",
      headerCellMovingBackgroundColor: "rgb(80, 40, 140)",
      pickerListBackgroundColor: "hsla(0, 0%, 12%, 1.00)",
      cellWidgetSpacing: "1rem",
    });

  return (
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
      />
    </div>
  );
};
