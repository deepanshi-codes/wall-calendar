"use client";

import { CalendarEvent, EVENT_COLORS } from "@/hooks/useCalendar";

interface CalendarGridProps {
  currentMonth: Date;
  today: Date;
  selStart: Date | null;
  selEnd: Date | null;
  sortedRange: [Date, Date] | null;
  getEventsForDay: (d: Date) => CalendarEvent[];
  onDayClick: (d: Date) => void;
}

const DAY_HEADERS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

function buildCells(month: Date) {
  const y = month.getFullYear();
  const m = month.getMonth();
  const first = new Date(y, m, 1);
  const last = new Date(y, m + 1, 0);
  const startDay = (first.getDay() + 6) % 7; // Mon=0

  const cells: { d: Date; otherMonth: boolean }[] = [];

  for (let i = 0; i < startDay; i++) {
    const prev = new Date(y, m, -(startDay - i - 1));
    cells.push({ d: prev, otherMonth: true });
  }
  for (let d = 1; d <= last.getDate(); d++) {
    cells.push({ d: new Date(y, m, d), otherMonth: false });
  }
  while (cells.length % 7 !== 0) {
    const nd = new Date(y, m + 1, cells.length - startDay - last.getDate() + 1);
    cells.push({ d: nd, otherMonth: true });
  }
  return cells;
}

export default function CalendarGrid({
  currentMonth,
  today,
  selStart,
  selEnd,
  sortedRange,
  getEventsForDay,
  onDayClick,
}: CalendarGridProps) {
  const cells = buildCells(currentMonth);

  function getCellClass(d: Date, otherMonth: boolean): string {
    const classes = ["day-cell"];
    if (otherMonth) classes.push("other-month");
    const dow = (d.getDay() + 6) % 7;
    if (dow === 5) classes.push("sat");
    if (dow === 6) classes.push("sun");
    if (!otherMonth && d.getTime() === today.getTime()) classes.push("today");
    if (sortedRange) {
      const [lo, hi] = sortedRange;
      if (d.getTime() === lo.getTime()) classes.push("range-start");
      else if (d.getTime() === hi.getTime()) classes.push("range-end");
      else if (d > lo && d < hi) classes.push("in-range");
    }
    return classes.join(" ");
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "2px", marginBottom: "4px" }}>
        {DAY_HEADERS.map((h, i) => (
          <div key={h} style={{ textAlign: "center", fontSize: "10px", fontWeight: 600, letterSpacing: "1px", padding: "4px 0", color: i >= 5 ? "var(--cal-sat)" : "var(--cal-muted)" }}>
            {h}
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: "3px" }}>
        {cells.map(({ d, otherMonth }, idx) => {
          const cls = getCellClass(d, otherMonth);
          const dayEvents = !otherMonth ? getEventsForDay(d) : [];
          const isInRange = cls.includes("range-");
          return (
            <div
              key={idx}
              className={cls}
              onClick={() => onDayClick(d)}
              style={{
                flexDirection: "column",
                gap: "2px",
                color: (d.getDay() === 6 || d.getDay() === 0) && !isInRange ? "var(--cal-sat)" : undefined,
              }}
            >
              <span>{d.getDate()}</span>
              {dayEvents.length > 0 && (
                <div style={{ display: "flex", gap: "2px", justifyContent: "center" }}>
                  {dayEvents.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: isInRange ? "rgba(255,255,255,0.8)" : EVENT_COLORS[ev.colorIdx]?.dot ?? "#888",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
