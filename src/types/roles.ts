/**
 * System Role & Permission Definition Architecture for Diran Peak Adventure
 *
 * Defines access control, responsibilities, and permissions for all platform users:
 * - Admin (Super Administrator)
 * - Manager (Expedition & Operations Manager)
 * - Moderator (Content & Review Moderator)
 * - Traveler (Tourist & General Traveler)
 * - Climber (High-Altitude Mountaineer & Permit Applicant)
 * - Partner Vehicle (4x4 & Transport Fleet Operator)
 * - Partner Hotel (Hospitality, Hotel & Resort Vendor)
 * - Guide (Alpine Mountain Guide & High Altitude Porter)
 */

export type UserRole =
  | 'admin'
  | 'manager'
  | 'moderator'
  | 'traveler'
  | 'climber'
  | 'partner_vehicle'
  | 'partner_hotel'
  | 'guide'
  | 'customer'; // legacy fallback alias for traveler

export interface RolePermission {
  id: string;
  name: string;
  description: string;
}

export interface RoleConfig {
  id: UserRole;
  label: string;
  shortTitle: string;
  category: 'Executive' | 'Operations' | 'Tourist' | 'Vendor' | 'Field Staff';
  description: string;
  badgeBg: string;
  badgeText: string;
  borderColor: string;
  permissions: string[];
  canAccessAdminPanel: boolean;
}

export const PLATFORM_ROLES: RoleConfig[] = [
  {
    id: 'admin',
    label: 'Super Administrator',
    shortTitle: 'Admin',
    category: 'Executive',
    description: 'Complete system authority. Manages all users, roles, financial records, API keys, and platform settings.',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    borderColor: 'border-amber-300',
    canAccessAdminPanel: true,
    permissions: [
      'Full System Access',
      'Manage User Accounts',
      'Assign & Revoke User Roles',
      'Verify Traveler & Vendor Credentials',
      'Approve & Decline Expedition Bookings',
      'Review & Reply to All Inquiries (Vehicle, Hotel, B2B, Guide)',
      'Manage Fleet & Hotel Partner Networks',
      'Moderate Reviews & Publish Updates',
      'Dispatch Broadcast Emails',
      'Configure System & Security Alerts'
    ]
  },
  {
    id: 'manager',
    label: 'Expedition Manager',
    shortTitle: 'Manager',
    category: 'Operations',
    description: 'Manages tour operations, guide assignments, vehicle logistics, hotel room allocations, and booking schedules.',
    badgeBg: 'bg-purple-100',
    badgeText: 'text-purple-900',
    borderColor: 'border-purple-300',
    canAccessAdminPanel: true,
    permissions: [
      'Access Operations Console',
      'Confirm & Schedule Bookings',
      'Assign Mountain Guides & Field Staff',
      'Review & Reply to Fleet Inquiries',
      'Coordinate Hotel & Resort Reservations',
      'View Verified Climber Permitting Documents',
      'Manage B2B Partner Applications'
    ]
  },
  {
    id: 'moderator',
    label: 'Content Moderator',
    shortTitle: 'Moderator',
    category: 'Operations',
    description: 'Maintains platform integrity, verifies traveler reviews, responds to general support questions, and curates FAQs.',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-900',
    borderColor: 'border-blue-300',
    canAccessAdminPanel: true,
    permissions: [
      'Access Support Console',
      'Moderate & Publish Tour Reviews',
      'Review & Respond to Contact Messages',
      'Assist Guests with Booking Questions',
      'Curate Itinerary Highlights & FAQs'
    ]
  },
  {
    id: 'traveler',
    label: 'Tourist / General Traveler',
    shortTitle: 'Traveler',
    category: 'Tourist',
    description: 'Registered tourist account. Explores tours, reserves departures, downloads official booking vouchers, and submits reviews.',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-800',
    borderColor: 'border-slate-300',
    canAccessAdminPanel: false,
    permissions: [
      'Book Trekking & Cultural Tours',
      'Submit Custom Trip & Contact Queries',
      'Reserve 4x4 Fleet Vehicles & Hotel Rooms',
      'Download Verified PDF Booking Vouchers',
      'Save Wishlist & Favorite Itineraries',
      'Write Verified Tour Reviews'
    ]
  },
  {
    id: 'climber',
    label: 'High-Altitude Climber',
    shortTitle: 'Climber',
    category: 'Tourist',
    description: 'Certified mountaineer. Applies for 6000m, 7000m, and 8000m climbing permits, summit logistics, and base camp services.',
    badgeBg: 'bg-cyan-100',
    badgeText: 'text-cyan-900',
    borderColor: 'border-cyan-300',
    canAccessAdminPanel: false,
    permissions: [
      'Book 6000m/7000m/8000m Mountaineering Expeditions',
      'Submit Government LOI & Permit Applications',
      'Request High-Altitude Porters (HAP) & Base Camp Cooks',
      'Access Extreme Altitude GPS Route Waypoints',
      'Maintain Verified Climbing Passport & Summit Bio'
    ]
  },
  {
    id: 'partner_vehicle',
    label: 'Vehicle Fleet Partner',
    shortTitle: 'Fleet Partner',
    category: 'Vendor',
    description: 'Transport partner (4x4 jeeps, Land Cruisers, coasters, vans). Receives fleet inquiries and coordinates Karakoram transit.',
    badgeBg: 'bg-orange-100',
    badgeText: 'text-orange-900',
    borderColor: 'border-orange-300',
    canAccessAdminPanel: false,
    permissions: [
      'View Assigned Vehicle Rental Inquiries',
      'Coordinate Skardu/Gilgit/KKH Route Dispatches',
      'Update Vehicle Availability & Spec Details',
      'Access Emergency Mountain Road Alerts'
    ]
  },
  {
    id: 'partner_hotel',
    label: 'Hotel & Resort Partner',
    shortTitle: 'Hotel Partner',
    category: 'Vendor',
    description: 'Hospitality partner. Receives room reservation requests, manages seasonal accommodation inventory, and guest check-ins.',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    borderColor: 'border-emerald-300',
    canAccessAdminPanel: false,
    permissions: [
      'Receive Hotel Room Reservation Inquiries',
      'Confirm Seasonal Room Allocation',
      'Coordinate Climber Base Camp Rest Stays',
      'Provide Verified DTS Licensed Hospitality'
    ]
  },
  {
    id: 'guide',
    label: 'Mountain Guide & Alpine Porter',
    shortTitle: 'Mountain Guide',
    category: 'Field Staff',
    description: 'Licensed alpine guide or High-Altitude Porter. Views expedition crew rosters, client safety manifests, and route milestones.',
    badgeBg: 'bg-indigo-100',
    badgeText: 'text-indigo-900',
    borderColor: 'border-indigo-300',
    canAccessAdminPanel: false,
    permissions: [
      'View Assigned Trek & Expedition Schedules',
      'Access Client Emergency Contact & Medical Data',
      'Track Day-by-Day GPS Waypoint Stages',
      'Submit Field Safety & Acclimatization Logs'
    ]
  }
];

export const getRoleConfig = (role?: string): RoleConfig => {
  const normalized = (role || 'traveler').toLowerCase();
  if (normalized === 'customer') {
    return PLATFORM_ROLES.find(r => r.id === 'traveler')!;
  }
  return PLATFORM_ROLES.find(r => r.id === normalized) || PLATFORM_ROLES.find(r => r.id === 'traveler')!;
};

export const canUserAccessAdmin = (role?: string): boolean => {
  const conf = getRoleConfig(role);
  return conf.canAccessAdminPanel;
};
