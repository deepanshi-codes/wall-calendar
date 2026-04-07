"use client";

import { useState } from "react";
import { CalendarEvent, EVENT_COLORS, fmtDate } from "@/hooks/useCalendar";

interface EventsPanelProps {
  sortedRange: [Date, Date] | null;
  eventsThisMonth: CalendarEvent[];
  selectedColor: number;
  onColorSelect: (i: number) => void;
  onAdd: (text: string, colorIdx: number, range: [Date, Date] | null) => void;
  onDelete: (id: string) => void;
}

export default function EventsPanel({
  sortedRange,
  eventsThisMonth,
  selectedColor,
  onColorSelect,
  onAdd,
  onDelete,
}: EventsPanelProps) {
  const [text, setText] = useState("");

  const rangeLabel = (() => {
    if (!sortedRange) return "Select a date first";
    const [lo, hi] = sortedRange;
    if (lo.getTime() === hi.getTime()) return fmtDate(lo);
    return `${fmtDate(lo)} – ${fmtDate(hi)}`;
  })();

  const handleSave = () => {
    if (!text.trim() || !sortedRange) return;
    onAdd(text, selectedColor, sortedRange);
    setText("");
  };

  return (
    <div
      style={{
        paddingTop: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Header */}
      <div
        style={{
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--cal-muted)",
        }}
      >
        Events
      </div>

      {/* Add form */}
      <div
        style={{
          background: "var(--cal-note-bg)",
          borderRadius: "12px",
          padding: "12px",
          border: "1px solid var(--cal-border)",
        }}
      >
        <div
          style={{
            fontSize: "11px",
            color: "var(--cal-blue)",
            fontWeight: 500,
            marginBottom: "8px",
          }}
        >
          {rangeLabel}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add an event or note..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSave(); }
          }}
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "var(--cal-text)",
            resize: "none",
            lineHeight: 1.5,
            minHeight: "52px",
          }}
        />

        {/* Color picker */}
        <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "6px" }}>
          {EVENT_COLORS.map((col, i) => (
            <div
              key={i}
              onClick={() => onColorSelect(i)}
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: col.dot,
                cursor: "pointer",
                border: i === selectedColor ? "2.5px solid var(--cal-text)" : "2.5px solid transparent",
                transform: i === selectedColor ? "scale(1.2)" : "scale(1)",
                transition: "transform 0.15s, border-color 0.15s",
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={handleSave}
          disabled={!text.trim() || !sortedRange}
          style={{
            marginTop: "10px",
            width: "100%",
            background: text.trim() && sortedRange ? "var(--cal-blue)" : "var(--cal-border)",
            color: text.trim() && sortedRange ? "#fff" : "var(--cal-muted)",
            border: "none",
            borderRadius: "8px",
            padding: "8px",
            fontSize: "12px",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            cursor: text.trim() && sortedRange ? "pointer" : "default",
            transition: "background 0.2s, color 0.2s",
          }}
        >
          + Save event
        </button>
      </div>

      {/* Events list */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          maxHeight: "240px",
          overflowY: "auto",
        }}
      >
        {eventsThisMonth.length === 0 ? (
          <div
            style={{
              fontSize: "12px",
              color: "var(--cal-muted)",
              textAlign: "center",
              padding: "16px 0",
              lineHeight: 1.6,
            }}
          >
            No events this month.
            <br />
            Select a date and add one!
          </div>
        ) : (
          eventsThisMonth.map((ev) => {
            const col = EVENT_COLORS[ev.colorIdx] ?? EVENT_COLORS[0];
            return (
              <div
                key={ev.id}
                style={{
                  borderRadius: "10px",
                  padding: "9px 11px",
                  background: col.bg,
                  color: col.text,
                  position: "relative",
                  cursor: "default",
                }}
                className="event-item"
              >
                <div style={{ fontSize: "10px", fontWeight: 600, opacity: 0.65, marginBottom: "2px", letterSpacing: "0.3px" }}>
                  {ev.label}
                </div>
                <div style={{ fontSize: "12px", lineHeight: 1.4 }}>{ev.text}</div>
                <button
                  onClick={() => onDelete(ev.id)}
                  style={{
                    position: "absolute",
                    top: "7px",
                    right: "9px",
                    background: "none",
                    border: "none",
                    fontSize: "14px",
                    cursor: "pointer",
                    color: "inherit",
                    opacity: 0.45,
                    lineHeight: 1,
                    padding: "2px 4px",
                    borderRadius: "4px",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.45")}
                >
                  ×
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
