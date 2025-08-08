"use client";

import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

NProgress.configure({
  showSpinner: false,
  speed: 400,
  easing: "ease",
});

export function LoadingBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.configure({ ...NProgress.settings, showSpinner: false });
    NProgress.start();
    NProgress.done();
  }, [pathname]);

  return null; // NProgress manages the DOM directly
}
