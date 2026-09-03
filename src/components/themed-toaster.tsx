import { Toaster } from "sonner";
import { usePrefs } from "@/lib/prefs";

export function ThemedToaster() {
  const { theme } = usePrefs();
  return (
    <Toaster
      theme={theme}
      position="bottom-right"
      toastOptions={{
        className: "font-sans",
        style: {
          background: "var(--color-panel)",
          border: "1px solid var(--color-edge)",
          color: "var(--color-fog)",
          borderRadius: 6,
        },
      }}
    />
  );
}
