# Adventure Tours Listing Page & Integrated Expedition Architecture

Enrich the tour listing experience with cards featuring high-impact imagery, concise adventure overviews, clear pricing, and an intuitive "Explore Tour" call-to-action, seamlessly integrated with search/filtering and connected to dynamic day-by-day GPS expedition routes and real-time weather data.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following design decisions were confirmed based on your preferences:
> - **Tour Card Anatomy**: Preserves the established booking card layout while adding a clean 2-line description snippet and an "Explore Tour" call-to-action button alongside the price baseline.
> - **Action Workflow**: Clicking "Explore Tour" or the card seamlessly transitions the traveler to the full Tour Details view with the interactive GPS map, day-by-day itinerary, and booking engine.
> - **Catalog Integration**: Directly enhances `ToursListPage.tsx` and `TourCard.tsx`, maintaining all keyword search, duration, difficulty, and adventure style filters while ensuring consistent layout across devices.

---

## 1. Overview & Core Concept

- **What It Does**: Provides a dedicated, responsive tour listing interface showcasing Pakistan's Karakoram, Himalayan, and Hindu Kush expeditions. Each tour card highlights the destination photo, altitude and duration badges, location, tour title, an engaging 2-line route summary, real-time pricing with any seasonal discounts, and a prominent "Explore Tour" button.
- **Target Audience**: Adventure travelers, mountaineers, trekkers, and cultural explorers planning expeditions to K2, Broad Peak, Spantik, Fairy Meadows, Deosai, and Hunza Valley.
- **Key Value**: Delivers immediate clarity on tour highlights before navigating into deep expedition details, maintaining seamless continuity with the GPS topography route and live alpine weather forecasting.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Browse & Filter**: Travelers arrive on `/tours` (or click "All Tours" in the navigation) and encounter the catalog header and filter bar (Keyword search, Adventure Style dropdown, Duration, and Difficulty).
2. **Card Evaluation**: Each adventure is presented in a uniform card layout:
   - High-resolution cover photo with zoom on hover.
   - Distinct tags for expedition category and duration in days.
   - Geographical region indicator with map pin.
   - Bold tour title in dark slate (`#1a2b48`).
   - 2-line concise description snippet (`line-clamp-2 text-slate-500 text-xs`).
   - Clear price baseline ("From $X,XXX") paired with the primary `"Explore Tour"` action button (`#5191fa` / hover `#3875e0`).
3. **Transition to Expedition Details**: Clicking "Explore Tour" opens the full tour experience featuring:
   - Synchronized day-by-day GPS route map with interactive waypoints and elevation profiles.
   - Real-time weather forecasting matching the tour's primary base or pass.
   - Departure dates and booking modal.

### Visual Identity & Theme
- **Color Palette**:
  - Dominant Canvas (60%): `#f7f8fa` off-white background with `#ffffff` card surfaces.
  - Structural Borders & Muted Text (30%): Hairline borders (`#dfdfdf`), slate text (`#5e6d77` / `#1a2b48`).
  - Accent Color (10%): Chogori brand blue (`#5191fa`) for call-to-action buttons, active tabs, and link hovers; crimson (`#c03`) reserved strictly for sale percentages.
- **Typography & Hierarchy**:
  - Headings: `Plus Jakarta Sans` / SemiBold and Bold for crisp legibility.
  - Body & Overviews: 13px–14px regular with balanced leading.
  - Pricing & Numerical Metrics: Tabular numerals (`font-medium tabular-nums`) with clear strikethrough original prices where discounted.
- **Anti-Slop Discipline**:
  - No decorative status dots or pulsing indicators.
  - No pill badge sandwiches; metadata is cleanly structured.
  - Clean hairline borders with single-level hover elevation.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Responsive Grid with Contiguous Button & Price Baseline**
  - *Chosen Approach*: Maintain a 3-column desktop / 2-column tablet / 1-column mobile grid with identical card heights using flexbox. The price and "Explore Tour" CTA button share a contiguous footer row inside the card.
  - *Why*: Ensures travelers can scan prices and trigger navigation effortlessly without cluttering the visual hierarchy.
  - *Alternatives Considered*: Floating CTA over the image (rejected due to obstruction of mountain scenery and poor accessibility).

- **Decision 2: Seamless Integration into Existing Catalog Architecture**
  - *Chosen Approach*: Enhance `src/components/TourCard.tsx` and `src/pages/ToursListPage.tsx` directly rather than building a detached duplicate page.
  - *Why*: Guarantees all search parameters, category filters, wishlist favorites, and navigation state remain fully unified across the application.

- **Decision 3: Robust Day-by-Day Route & Weather Alignment**
  - *Chosen Approach*: Ensure every tour in `TOURS_DATA` generates an accurate GPS expedition route matching its specific day-by-day itinerary in `trekkingRoutes.ts`, with weather widgets dynamically targeting the exact coordinates of the tour location.
  - *Why*: Eliminates fallback mismatches where unrelated trekking paths were shown on 6,000m or cultural packages.

---

## 4. Technical Architecture & Data Strategy

### Component & Data Hierarchy Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                          ToursListPage.tsx                             │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │ Filter Bar: Keywords · Adventure Style · Duration · Difficulty   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                │                                       │
│                                ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │                       Filtered Tours Grid                        │  │
│  │                                                                  │  │
│  │   ┌──────────────────────────────────────────────────────────┐   │  │
│  │   │                      TourCard.tsx                        │   │  │
│  │   │  [ Image + Wishlist Heart + Category/Duration Tags ]     │   │  │
│  │   │  [ Location Pin: Region / Valley ]                       │   │  │
│  │   │  [ Title: K2 Base Camp Trek & Concordia ]                │   │  │
│  │   │  [ Description: 2-line overview snippet ]                │   │  │
│  │   │  ──────────────────────────────────────────────────────  │   │  │
│  │   │  [ Price: From $2,450 ]   [ Button: "Explore Tour" ➔ ]   │   │  │
│  │   └──────────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │ onSelect(tour)
                                     ▼
┌────────────────────────────────────────────────────────────────────────┐
│                          TourDetailPage.tsx                            │
│  ┌─────────────────────────────────┐ ┌───────────────────────────────┐ │
│  │   InteractiveRouteMap.tsx       │ │      WeatherWidget.tsx        │ │
│  │   - Dynamic Day-by-Day GPS      │ │      - Coordinates tied to    │ │
│  │   - Itinerary-mapped waypoints  │ │        tour destination       │ │
│  │   - Elevation profile & topo    │ │      - Live Open-Meteo cache  │ │
│  └─────────────────────────────────┘ └───────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Planned File Modifications (For Execution Phase After Approval)
1. **`src/components/TourCard.tsx`**: Add `overview` description text snippet with `line-clamp-2` and add the stylized `"Explore Tour"` action button with arrow icon, cleanly aligned with the pricing container.
2. **`src/pages/ToursListPage.tsx`**: Refine layout spacing, ensure smooth responsive transitions, and ensure empty states and result counters accurately reflect active filters.
3. **`src/data/trekkingRoutes.ts` & `src/components/InteractiveRouteMap.tsx`**: Ensure dynamic generation from `tour.itinerary` handles all tours so no package falls back to a mismatched route.
4. **`src/components/WeatherWidget.tsx`**: Ensure location coordinate mapping dynamically covers all tour destinations (Skardu, Hunza, Fairy Meadows, Concordia, Chitral, Swat, Islamabad).
5. **`src/context/AuthContext.tsx` & `src/pages/UserDashboardPage.tsx`**: Verify admin user password reset updates both credentials state and persistence.
