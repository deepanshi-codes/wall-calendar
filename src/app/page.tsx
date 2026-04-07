"use client";

import WallCalendar from "@/components/WallCalendar";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--cal-bg)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "2rem 1rem",
        transition: "background 0.3s",
      }}
    >
      <WallCalendar />
    </main>
  );
}
