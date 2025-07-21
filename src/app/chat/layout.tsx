import { HeadCircuitIcon } from "@phosphor-icons/react/dist/ssr";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh bg-gradient-to-b from-violet-100 to-stone-100">
      <div className="border-r border-gray-600 p-1">
        <h1>
          Impersonator <HeadCircuitIcon />
        </h1>
        <h2>История чатов</h2>
        <ul>{/*todo: список чатов */}</ul>
      </div>
      {children}
    </div>
  );
}
