import { hide } from "@/lib/features/dialog/dialogSlice";
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

interface DialogProps {
  show: boolean;
  children: ReactNode;
}

export const Dialog = ({ show = false, children }: DialogProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (show) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-zinc-900 w-full max-w-[720px] max-h-[90vh] overflow-y-auto rounded-lg shadow-md flex flex-col">
        <div className="p-6 flex-1">{children}</div>

        <div className="sticky bottom-0 bg-zinc-900 p-4 border-t border-zinc-700 flex justify-center">
          <button
            className="rounded-md bg-violet-950 px-4 py-2 text-sm font-semibold text-white focus:outline-none hover:bg-red-700"
            onClick={() => dispatch(hide())}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
