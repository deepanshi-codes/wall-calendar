"use client";

import { useRef, useCallback } from "react";

const MONTH_IMAGES = [
  "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=900&q=80", // Jan
  "https://images.unsplash.com/photo-1455218873509-8097305ee378?w=900&q=80", // Feb
  "https://images.unsplash.com/photo-1490682143684-14369e18dce8?w=900&q=80", // Mar
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80", // Apr
  "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=900&q=80", // May
  "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=900&q=80", // Jun
  "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=900&q=80", // Jul
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80", // Aug
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=900&q=80", // Sep
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80", // Oct
  "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80", // Nov
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80", // Dec
];

const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

interface HeroImageProps {
  currentMonth: Date;
  customImage: string | null;
  onImageChange: (src: string) => void;
}

export default function HeroImage({
  currentMonth,
  customImage,
  onImageChange,
}: HeroImageProps) {
  const fileRef = useRef<HTMLInputElement>(null);
  const month = currentMonth.getMonth();
  const year = currentMonth.getFullYear();
  const imgSrc = customImage ?? MONTH_IMAGES[month];

  const handleFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) onImageChange(ev.target.result as string);
      };
      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  return (
    <div
      style={{
        position: "relative",
        height: "clamp(160px, 28vw, 240px)",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => fileRef.current?.click()}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imgSrc}
        alt={`${MONTHS[month]} landscape`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.6s ease",
          display: "block",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLImageElement).style.transform = "scale(1.04)")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLImageElement).style.transform = "scale(1)")
        }
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom right, transparent 35%, rgba(10,30,70,0.75))",
        }}
      />

      {/* Month / Year label */}
      <div
        style={{
          position: "absolute",
          bottom: "18px",
          right: "22px",
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Serif Display', serif",
            color: "rgba(255,255,255,0.65)",
            fontSize: "13px",
            letterSpacing: "4px",
            marginBottom: "2px",
          }}
        >
          {year}
        </div>
        <div
          style={{
            fontFamily: "'DM Serif Display', serif",
            color: "#fff",
            fontSize: "clamp(24px, 5vw, 40px)",
            lineHeight: 1,
          }}
        >
          {MONTHS[month].toUpperCase()}
        </div>
      </div>

      {/* Upload button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          fileRef.current?.click();
        }}
        style={{
          position: "absolute",
          top: "12px",
          right: "12px",
          background: "rgba(255,255,255,0.18)",
          border: "1px solid rgba(255,255,255,0.4)",
          color: "#fff",
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "11px",
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
          letterSpacing: "0.5px",
          transition: "background 0.2s",
          backdropFilter: "blur(4px)",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.32)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.background =
            "rgba(255,255,255,0.18)")
        }
      >
        Change photo
      </button>

      <input
        type="file"
        ref={fileRef}
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
    </div>
  );
}
