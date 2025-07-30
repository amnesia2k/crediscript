import { useEffect, useState } from "react";

export function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // 🚨 Avoid SSR/client mismatch by rendering nothing until after hydration
    return <div style={{ visibility: "hidden" }} />;
  }

  return <>{children}</>;
}
