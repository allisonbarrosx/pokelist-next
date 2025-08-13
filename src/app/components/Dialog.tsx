import { hide } from "@/lib/features/dialog/dialogSlice";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

interface Dialog {
  show: boolean;
  children: ReactNode;
}

export const Dialog = ({ show, children }: Dialog) => {
  const classControlDialog = show ? "" : "hidden";
  const dispatch = useDispatch();
  return (
    <div
      className={`${classControlDialog} absolute z-99 overflow-hidden w-screen h-screen top-0 left-0`}
    >
      {/* <div className="relative h-screen flex justify-center items-center bg-yellow-50/30"> */}
      <div className="relative h-screen flex justify-center items-center">
        <div className="bg-zinc-900 w-180 shrink px-12 pt-12 pb-6 m-8 rounded-lg shadow-md">
          {children}
          <div className="mt-10 flex justify-center">
            <button
              className="rounded-md bg-violet-950 px-4 py-2 text-sm font-semibold text-white opacity-100 focus:outline-none hover:bg-red-700 hover:cursor-pointer"
              onClick={() => dispatch(hide())}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
