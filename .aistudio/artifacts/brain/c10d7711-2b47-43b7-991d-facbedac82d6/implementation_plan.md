# Implementation Plan: Dynamic Weather Forecast, Guest Bookings & Inquiries in Admin Panel, and PDF Booking Voucher

Deliver three high-impact enhancements to the Diran Peak Adventure platform:
1. **Dynamic Regional Weather Forecast Component**: Embed live conditions and a full 5-day mountain forecast on every tour detail page using the free Open-Meteo API (zero API key needed), automatically mapped to specific tour expedition regions (Skardu, Gilgit, Askole/Baltoro, Hunza/Nagar, Fairy Meadows/Nanga Parbat, Chitral/Hindukush, etc.).
2. **Guest Booking, Inquiry & Instant Reservation Admin Integration**: Enable visitors without an account to reserve or inquire instantly, saving documents to Firestore with `isGuest: true` and guest reference codes, while ensuring the Admin Panel's Bookings and Messages tabs display all guest submissions in real time.
3. **Official PDF Booking Voucher Generation & Download**: Add a high-fidelity client-side PDF expedition voucher generator (`jspdf`) in the User Dashboard (and instant booking confirmation modal) featuring Government of Pakistan Department of Tourist Services (DTS Lic. #1842) credentials, QR verification code, official stamp, lead traveler credentials, trip dates, and payment/reservation status.

---

## 1. User Review Required

> [!IMPORTANT]
> Based on your confirmed choices:
> - **Weather Provider**: Open-Meteo free API without requiring an API key (high-resolution elevation & alpine coordinates for Northern Pakistan).
> - **Guest Identification**: Guest reservations and inquiries are clearly tagged with a `Guest` badge, reference code (e.g. `DPA-GUEST-XXXX` or `DPA-2027-XXXX`), customer name, email, and WhatsApp contact in the Admin Panel.
> - **Voucher Style**: Official expedition voucher with QR verification, DTS License #1842 seal, Karakoram logistics stamp, and printable PDF download.

---

## 2. Proposed Changes

### A. Dynamic Weather Forecast Component (`src/components/WeatherWidget.tsx` & `src/pages/TourDetailPage.tsx`)
- Enhance `WeatherWidget.tsx` to provide:
  - **Dynamic Region Matching**: Comprehensive geographic coordinate mapping covering all tours (Askole / K2 Concordia, Skardu Valley, Gilgit Gateway, Hunza Nagar & Minapin, Fairy Meadows & Nanga Parbat, Deosai Plateau, Spantik, Hushe Valley, Chitral Hindukush, Swat, and Islamabad).
  - **Live Current Conditions**: Temperature (°C/°F toggle), apparent temperature ("Feels Like"), weather icon, wind speed (km/h & knots), wind direction compass, atmospheric pressure (hPa), humidity (%), precipitation probability, and altitude reference.
  - **Full 5-Day Forecast Grid**: Clean 5-day daily forecast cards displaying weekday, date, weather condition icon (Sunny, Clear, Partly Cloudy, Alpine Snow, Rain, Fog), temperature range (High/Low), and precipitation probability percentage.
  - **Alpine Acclimatization & Safety Advisory**: Dynamic trail condition note based on elevation and real-time precipitation.
  - **Seamless Fallback**: Graceful handling of network timeouts with realistic Karakoram seasonal baselines.

### B. Guest Bookings & Inquiries in Admin Panel (`firestore.rules`, `src/context/AuthContext.tsx`, `src/pages/TourDetailPage.tsx`, `src/pages/UserDashboardPage.tsx`)
- **Firestore Security Rules (`firestore.rules`)**:
  - Update `bookings` collection rules: Allow `create` for valid booking payloads even when unauthenticated (`!isSignedIn() || incoming().userId == request.auth.uid || isAdmin()`), ensuring guest reservations are saved directly to Firestore without permission denial.
  - Update `isValidBooking`: Support `isGuest: bool`, guest user IDs (`guest_*`), payment status, and optional guest metadata.
  - Deploy updated rules via `DeployRules` RPC to project `diranwebapp`.
- **Tour Detail Page Booking & Inquire Handlers (`src/pages/TourDetailPage.tsx`)**:
  - Fix `handleEnquirySubmit`: Capture full name, email, WhatsApp phone number, custom dates, and questions. Call `addContactInquiry` to store directly into Firestore `inquiries` collection, log activity, and display confirmation.
  - Enhance `handleBookNow`: Flag guest bookings with `isGuest: true` and pass traveler contact info cleanly into `createBooking`.
- **Auth Context Integration (`src/context/AuthContext.tsx`)**:
  - Ensure `createBooking` and `addContactInquiry` persist guest documents to Firestore and store a local copy so guest users can view their voucher immediately.
  - Fix admin state detection: Recognize admin sessions (`adminAuth?.isAuthenticated || user?.role === 'admin'`) so real-time Firestore listeners for `bookings` and `inquiries` sync all records, including guest submissions.
- **Admin Dashboard UI (`src/pages/UserDashboardPage.tsx`)**:
  - In the Bookings tab, display an explicit `Guest Reservation` badge, customer email, phone, and quick WhatsApp link.
  - In the Messages/Inquiries tab, show all inquiries with real-time status updates ("New", "Contacted", "Closed") and filter by Guest vs Registered travelers.

### C. PDF Booking Voucher Feature (`jspdf`, `src/utils/pdfVoucherGenerator.ts`, `src/pages/UserDashboardPage.tsx`, `src/components/BookingConfirmationModal.tsx`)
- Install `jspdf` package.
- Create `src/utils/pdfVoucherGenerator.ts`:
  - Generates a branded, high-resolution vector PDF (A4 format).
  - Header: Diran Peak Adventure logo typography, "GOVERNMENT OF PAKISTAN - DEPARTMENT OF TOURIST SERVICES DTS LIC. #1842".
  - Metadata Grid: Booking Reference, Issue Date, Booking Status (`RESERVED / GUARANTEED DEPARTURE`), Lead Traveler Name, Email, WhatsApp Phone, Party Breakdown.
  - Expedition Details: Tour Title, Region/Location, Max Elevation, Departure Date, Return Date, Duration.
  - Inclusions & Safety Checklist: Licensed Balti Mountain Guide, High Altitude Porter, BC Tents & Mess, Full Board Expedition Meals, Satellite inReach Checkpoints, First Aid & Hyperbaric Protocol.
  - Financial Summary: Total Package Cost, Payment / Reservation Status (`CONFIRMED DEPARTURE`), Balance Due details.
  - Verification & Security: QR code graphic linking to the booking confirmation, official digital authorization seal, signature block, and 24/7 emergency dispatch contact (+92 345 6412992).
- Add "Download PDF Voucher" buttons:
  - On each card in the User Dashboard's "My Expedition Bookings" section.
  - In the instant `BookingConfirmationModal.tsx` immediately after reservation.
  - In the Admin Panel's Bookings table for admin download.

---

## 3. Verification Plan

### Automated Build & Lint Verification
- Run `install_applet_package` for `jspdf` and `@types/jspdf`.
- Run `compile_applet` to confirm clean TypeScript compilation with zero errors.
- Run `lint_applet` to verify syntax and imports.

### Manual Verification Flows
1. **Weather Component**:
   - Navigate to different tour pages (e.g. K2 Base Camp, Diran Peak, Fairy Meadows, Skardu Valley).
   - Verify the location changes dynamically (e.g. Askole/Baltoro, Minapin Nagar, Skardu).
   - Confirm current weather displays live metrics and the 5-day forecast renders all 5 days with high/low temps and weather icons.
2. **Guest Booking & Inquiries**:
   - Open a tour page in an unauthenticated session (not logged in).
   - Submit an inquiry: Verify it appears in Firestore `inquiries` and in the Admin Panel's Messages tab.
   - Click "Instant Reserve & Guarantee" with guest details: Verify the booking appears in Firestore `bookings` and in the Admin Panel's Bookings tab with a `Guest` indicator.
3. **PDF Booking Voucher**:
   - In the User Dashboard, click "Download PDF Voucher".
   - Verify the PDF file downloads with filename format `DiranPeakAdventure_Voucher_<bookingCode>.pdf`.
   - In the Instant Booking Modal, click "Download Official PDF Voucher" and verify clean generation.
