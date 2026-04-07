"use client";

import { useCalendar } from "@/hooks/useCalendar";
import HeroImage from "./HeroImage";
import CalendarGrid from "./CalendarGrid";
import EventsPanel from "./EventsPanel";

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function WallCalendar() {
  const {
    today,
    currentMonth,
    selStart,
    selEnd,
    sortedRange,
    eventsThisMonth,
    dark,
    customImage,
    selectedColor,
    changeMonth,
    clickDay,
    clearRange,
    toggleDark,
    addEvent,
    deleteEvent,
    getEventsForDay,
    setCustomImage,
    setSelectedColor,
  } = useCalendar();

  const hint = (() => {
    if (!selStart) return "Click a date to start";
    if (!selEnd) return "Click again to set a range";
    const days =
      Math.round((sortedRange![1].getTime() - sortedRange![0].getTime()) / 86400000) + 1;
    return `${days} day${days !== 1 ? "s" : ""} selected`;
  })();

  const navBtn = (dir: number, label: string) => (
    <button
      onClick={() => changeMonth(dir)}
      aria-label={label}
      style={{
        background: "none",
        border: "1px solid var(--cal-border)",
        borderRadius: "9px",
        width: "32px",
        height: "32px",
        cursor: "pointer",
        fontSize: "16px",
        color: "var(--cal-muted)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "var(--cal-blue-light)";
        el.style.borderColor = "var(--cal-blue)";
        el.style.color = "var(--cal-blue)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = "none";
        el.style.borderColor = "var(--cal-border)";
        el.style.color = "var(--cal-muted)";
      }}
    >
      {dir < 0 ? "‹" : "›"}
    </button>
  );

  return (
    <div style={{ width: "100%", maxWidth: "860px" }}>
      {/* Spiral rings */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(14px, 2.8vw, 24px)",
          marginBottom: "-8px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "13px",
              height: "24px",
              border: "2.5px solid #7a8a9a",
              borderRadius: "7px",
              background: "linear-gradient(135deg, #d0d8e0, #a8b8c4)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "5px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "4px",
                height: "10px",
                background: "#8fa0af",
                borderRadius: "2px",
              }}
            />
          </div>
        ))}
      </div>

      {/* Card */}
      <div
        style={{
          background: "var(--cal-card)",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "var(--cal-shadow)",
          border: "1px solid var(--cal-border)",
          transition: "background 0.3s, box-shadow 0.3s",
        }}
      >
        <HeroImage
          currentMonth={currentMonth}
          customImage={customImage}
          onImageChange={setCustomImage}
        />

        {/* Wave divider */}
        <svg
          viewBox="0 0 860 32"
          preserveAspectRatio="none"
          style={{ display: "block", width: "100%", height: "32px", marginTop: "-2px", fill: "var(--cal-card)", transition: "fill 0.3s" }}
        >
          <path d="M0,0 L860,0 L860,32 Q430,6 0,32 Z" />
        </svg>

        {/* Body */}
        <div
          style={{
            padding: "0 20px 20px",
            display: "grid",
            gridTemplateColumns: "clamp(160px, 22%, 200px) 1fr",
            gap: "24px",
          }}
          className="calendar-body"
        >
          <EventsPanel
            sortedRange={sortedRange}
            eventsThisMonth={eventsThisMonth}
            selectedColor={selectedColor}
            onColorSelect={setSelectedColor}
            onAdd={addEvent}
            onDelete={deleteEvent}
          />

          <div style={{ paddingTop: "16px" }}>
            {/* Month nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px" }}>
              {navBtn(-1, "Previous month")}
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 400, color: "var(--cal-text)" }}>
                {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              {navBtn(1, "Next month")}
            </div>

            <CalendarGrid
              currentMonth={currentMonth}
              today={today}
              selStart={selStart}
              selEnd={selEnd}
              sortedRange={sortedRange}
              getEventsForDay={getEventsForDay}
              onDayClick={clickDay}
            />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            borderTop: "1px solid var(--cal-border)",
            background: "var(--cal-note-bg)",
            transition: "background 0.3s",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <button
            onClick={clearRange}
            style={{ background: "none", border: "none", fontSize: "12px", color: "var(--cal-muted)", cursor: "pointer", padding: "4px 8px", borderRadius: "6px", fontFamily: "'DM Sans', sans-serif", transition: "color 0.15s" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#dc2626")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "var(--cal-muted)")}
          >
            Clear selection
          </button>

          <span style={{ fontSize: "11px", color: "var(--cal-muted)" }}>{hint}</span>

          <button
            onClick={toggleDark}
            style={{ background: "none", border: "1px solid var(--cal-border)", borderRadius: "20px", padding: "5px 14px", fontSize: "11px", cursor: "pointer", color: "var(--cal-muted)", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--cal-blue)";
              el.style.color = "var(--cal-blue)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "var(--cal-border)";
              el.style.color = "var(--cal-muted)";
            }}
          >
            {dark ? "☀ Light" : "☾ Dark"}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 580px) { .calendar-body { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
