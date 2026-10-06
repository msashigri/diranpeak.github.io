# Security Specification - Diran Peak Adventure Firestore ABAC Rules

## 1. Data Invariants
1. **User Identity Invariant**: A user document at `/users/{userId}` can only be created or modified if `request.auth.uid == userId`. Standard users cannot escalate privileges or set `role: "admin"`.
2. **Booking Ownership Invariant**: A booking document in `/bookings/{bookingId}` must have `userId == request.auth.uid` unless created/managed by an authenticated administrator. A customer cannot modify another customer's booking.
3. **Booking Status Integrity**: Customers cannot unilaterally set a booking to "Confirmed" without administrator approval; updates must adhere to allowed state transitions or administrator overrides.
4. **Inquiry Protection**: Inquiries in `/inquiries/{inquiryId}` can be created by anyone (guest or signed-in user), but can only be read, listed, or managed by administrators or the submitting user.
5. **Newsletter Isolation**: Newsletter subscriptions in `/subscribers/{subscriberId}` can be created by anyone, but read/list is restricted to administrators.
6. **Denial-of-Wallet & Volumetric Limits**: All strings, IDs, and payload sizes have strict upper bounds (`size() <= 128` for IDs, `size() <= 2500` for messages).

## 2. The "Dirty Dozen" Payloads (Must Return PERMISSION_DENIED)
1. **Ghost Field Escalation**: Creating `/users/user123` with `{ role: 'admin', isAdmin: true }` without admin authorization.
2. **Identity Impersonation on Booking**: An authenticated user with UID `attacker456` attempting to write a booking with `userId: 'victim789'`.
3. **Cross-Tenant Booking Snooping**: User `user1` attempting to read `/bookings/booking_of_user2`.
4. **List Query Scraping**: Attempting an unrestricted `list` query across `/bookings` without filtering by `userId == request.auth.uid`.
5. **ID Poisoning Attack**: Writing to `/bookings/{bookingId}` where `bookingId` contains 2,000 characters or special control characters.
6. **Unauthenticated Profile Overwrite**: Unauthenticated user attempting to modify `/users/{userId}`.
7. **Status Shortcutting**: Normal traveler updating their booking status from `Pending Verification` to `Confirmed` directly.
8. **PII Harvesting on Inquiries**: Non-admin attempting to list all customer inquiries from `/inquiries`.
9. **Newsletter Scraping**: Non-admin attempting to list all newsletter subscriber emails from `/subscribers`.
10. **Spoofed Admin via Email**: Attempting to bypass admin checks with an unverified email address (`email_verified: false`).
11. **Immutability Breach**: An update payload attempting to alter the original `id` or `userId` on an existing booking.
12. **Huge Payload Memory Bomb**: Submitting a contact inquiry where `message` exceeds 5,000 characters.

## 3. Test Runner
Tested against Firestore rules validator ensuring all 12 negative test vectors fail with `PERMISSION_DENIED`.
