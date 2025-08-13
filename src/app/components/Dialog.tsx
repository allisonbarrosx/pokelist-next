import { hide } from "@/lib/features/dialog/dialogSlice";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

interface Dialog {
  show: boolean;
  children: ReactNode;
}

export const Dialog = ({ show = false, children }: Dialog) => {
  const classControlDialog = show ? "" : "hidden";
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

  return (
    <>
      {show && (
        <div
          className={`${classControlDialog} fixed z-50 w-full h-screen top-0 left-0 bg-black/50`}
        >
          <div className="relative h-screen flex justify-center items-center">
            <div className="bg-zinc-900 w-180 shrink px-12 pt-12 pb-6 m-8 rounded-lg shadow-md">
              {children}
              <div className="mt-5 md:mt-10 flex justify-center">
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
      )}
    </>
  );
};
