import { createRouter } from "@tanstack/react-router";
import { AppErrorComponent } from "@/lib/error-component";
import { AppNotFound } from "@/lib/not-found";
import { routeTree } from "./routeTree.gen";

const rawBase = import.meta.env.BASE_URL || "/";
const basepath = rawBase === "/" ? undefined : rawBase.replace(/\/$/, "");

export function getRouter() {
  return createRouter({
    routeTree,
    basepath,
    defaultErrorComponent: AppErrorComponent,
    defaultNotFoundComponent: AppNotFound,
  });
}
