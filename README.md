# 📅 Wall Calendar — Interactive React Component

A polished, interactive wall calendar built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Inspired by the physical wall calendar aesthetic — featuring a hero landscape image, date range selection, integrated notes, dark mode, and full responsiveness.

---

## ✨ Features

- **Wall Calendar Aesthetic** — Spiral rings, hero landscape photo, wave divider, and clean grid layout
- **Date Range Selection** — Click once for start date, click again for end date. Visual states for start, end, and in-between days
- **Integrated Notes** — Write notes attached to any selected date or date range, persisted via `localStorage`
- **Auto-changing Photos** — Hero image changes per month (12 curated Unsplash landscapes); upload your own photo too
- **Dark Mode** — Full dark theme with smooth transitions, preference saved to `localStorage`
- **Responsive Design** — Two-panel desktop layout collapses to stacked mobile layout
- **Note indicators** — Blue dot on dates that have saved notes
- **Today highlight** — Current date is always highlighted in yellow

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** — [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### 1. Clone or download the project

```bash
# If you have it as a zip, unzip it, then:
cd wall-calendar
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css        # Global styles + CSS variables for theming
│   ├── layout.tsx         # Root layout with font imports
│   └── page.tsx           # Entry page
├── components/
│   ├── WallCalendar.tsx   # Main component — assembles everything
│   ├── HeroImage.tsx      # Top image section with month labels
│   ├── CalendarGrid.tsx   # The 7-column day grid
│   └── NotesPanel.tsx     # Notes input area
└── hooks/
    └── useCalendar.ts     # All state logic (selection, notes, dark mode)
```

---

## 🧠 Architecture Decisions

| Decision | Rationale |
|---|---|
| **Next.js App Router** | Modern file-based routing, easy Vercel deployment |
| **CSS variables for theming** | Dark/light mode with zero JS color swaps — just toggle a class |
| **Custom hook (`useCalendar`)** | Separates all state logic from UI components, making each component pure and testable |
| **`localStorage` for persistence** | No backend needed — notes and dark mode preference survive page refresh |
| **Unsplash CDN for images** | Free, fast, high-quality landscape photos — one per month |

---

## 📱 Responsive Behavior

| Breakpoint | Layout |
|---|---|
| `> 560px` | Side-by-side: Notes panel on left, calendar grid on right |
| `≤ 560px` | Stacked: Calendar grid on top, notes panel below |

---

## 🌐 Deploy to Vercel (Free)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repo
4. Click **Deploy** — done! No configuration needed.

---

## 🎨 Customization

### Change accent color
Edit `src/app/globals.css` and update `--cal-blue`:
```css
:root {
  --cal-blue: #your-color-here;
}
```

### Add holidays / special dates
In `CalendarGrid.tsx`, add a `HOLIDAYS` set and check `dateKey(d)` against it to add a special CSS class.

### Add more note lines
In `NotesPanel.tsx`, change `Array.from({ length: 8 })` to a higher number.

---

## 📦 Built With

- [Next.js 14](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DM Serif Display + DM Sans](https://fonts.google.com/) — Google Fonts
- [Unsplash](https://unsplash.com/) — Landscape photos
