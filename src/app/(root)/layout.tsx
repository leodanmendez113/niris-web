import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0f2f3f", color: "#f4f2ec", fontFamily: "system-ui, sans-serif" }}>{children}</body>
    </html>
  );
}
