"use client";

import { useState, useCallback, useEffect } from "react";

export type CalendarEvent = {
  id: string;
  text: string;
  colorIdx: number;
  dateStart: string;
  dateEnd: string;
  label: string;
};

export const EVENT_COLORS = [
  { bg: "#fce7f3", text: "#9d174d", dot: "#ec4899" },
  { bg: "#d1fae5", text: "#065f46", dot: "#10b981" },
  { bg: "#ede9fe", text: "#5b21b6", dot: "#8b5cf6" },
  { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  { bg: "#e0f2fe", text: "#0c4a6e", dot: "#0ea5e9" },
];

export function fmtDate(d: Date) {
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

export function useCalendar() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selStart, setSelStart] = useState<Date | null>(null);
  const [selEnd, setSelEnd] = useState<Date | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [dark, setDark] = useState(false);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("cal_events_v2");
      if (saved) setEvents(JSON.parse(saved));
      const savedDark = localStorage.getItem("cal_dark");
      if (savedDark === "true") {
        setDark(true);
        document.documentElement.classList.add("dark");
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem("cal_events_v2", JSON.stringify(events)); } catch (_) {}
  }, [events]);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    try { localStorage.setItem("cal_dark", String(dark)); } catch (_) {}
  }, [dark]);

  const changeMonth = useCallback((dir: number) => {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + dir, 1));
  }, []);

  const handleDayClick = useCallback(
    (d: Date) => {
      setSelStart((prev) => {
        // If nothing selected OR range already complete → start fresh
        if (!prev) { setSelEnd(null); return d; }
        setSelEnd((prevEnd) => {
          if (prevEnd !== null) { setSelEnd(null); return null; }
          return d < prev ? prev : d; // will set end
        });
        if (selEnd !== null) return d; // reset start
        if (d < prev) { setSelEnd(prev); return d; }
        setSelEnd(d);
        return prev;
      });
    },
    [selEnd]
  );

  // Simpler, reliable day click
  const clickDay = useCallback(
    (d: Date) => {
      setSelStart((s) => {
        if (!s || selEnd) { setSelEnd(null); return d; }
        if (d < s) { setSelEnd(s); return d; }
        setSelEnd(d);
        return s;
      });
    },
    [selEnd]
  );

  const clearRange = useCallback(() => { setSelStart(null); setSelEnd(null); }, []);
  const toggleDark = useCallback(() => setDark((d) => !d), []);

  const sortedRange: [Date, Date] | null = (() => {
    if (!selStart) return null;
    if (!selEnd) return [selStart, selStart];
    return [selStart, selEnd].sort((a, b) => a.getTime() - b.getTime()) as [Date, Date];
  })();

  const addEvent = useCallback(
    (text: string, colorIdx: number, range: [Date, Date] | null) => {
      if (!text.trim() || !range) return;
      const [lo, hi] = range;
      const ev: CalendarEvent = {
        id: uid(),
        text: text.trim(),
        colorIdx,
        dateStart: lo.toISOString(),
        dateEnd: hi.toISOString(),
        label:
          lo.getTime() === hi.getTime()
            ? fmtDate(lo)
            : `${fmtDate(lo)} – ${fmtDate(hi)}`,
      };
      setEvents((prev) => [...prev, ev]);
    },
    []
  );

  const deleteEvent = useCallback((id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const getEventsForDay = useCallback(
    (d: Date) =>
      events.filter((ev) => {
        const s = new Date(ev.dateStart);
        const e = new Date(ev.dateEnd);
        s.setHours(0, 0, 0, 0);
        e.setHours(0, 0, 0, 0);
        return d >= s && d <= e;
      }),
    [events]
  );

  const eventsThisMonth = (() => {
    const y = currentMonth.getFullYear();
    const m = currentMonth.getMonth();
    const monthStart = new Date(y, m, 1);
    const monthEnd = new Date(y, m + 1, 0);
    monthEnd.setHours(23, 59, 59);
    return events
      .filter((ev) => {
        const s = new Date(ev.dateStart);
        const e = new Date(ev.dateEnd);
        return s <= monthEnd && e >= monthStart;
      })
      .sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
  })();

  return {
    today,
    currentMonth,
    selStart,
    selEnd,
    sortedRange,
    events,
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
  };
}
