export const EQUIPMENT_CATEGORIES = [
  "Construction Equipment",
  "Photography Equipment",
  "Vehicles & Transportation",
  "Agriculture Equipment",
  "Electronics",
  "Event Equipment",
] as const;

export const RENTAL_TYPES = ["Daily", "Weekly", "Monthly"] as const;

export const CUSTOMER_REVIEWS = [
  {
    name: "Rafiqul Islam",
    role: "Small Contractor, Dhap",
    rating: 5,
    comment:
      "Rented a concrete mixer and hammer drill for three days. Pickup was on time and both machines worked smoothly without any issue.",
  },
  {
    name: "Nusrat Jahan",
    role: "Event Planner, Station Road",
    rating: 5,
    comment:
      "Booked a sound system and projector for a university program. Clear pricing and fast Stripe payment saved us a lot of back and forth.",
  },
  {
    name: "Kamrul Hasan",
    role: "Freelance Photographer",
    rating: 4,
    comment:
      "Got a Sony mirrorless kit for a weekend wedding shoot. Clean gear, extra batteries included, and the owner was very helpful.",
  },
  {
    name: "Shafiqul Alam",
    role: "Farm Owner, Modern More",
    rating: 5,
    comment:
      "Hiring a power tiller for a week cost a fraction of buying one. Great platform for people around Rangpur.",
  },
];

export const TRUSTED_OWNERS = [
  {
    name: "Mahmudul Hasan",
    area: "Jahaj Company More, Rangpur",
    specialty: "Construction & Power Tools",
    listings: 14,
    rating: "4.9",
  },
  {
    name: "Tariqul Islam",
    area: "Station Road, Rangpur",
    specialty: "Event Sound & Transport",
    listings: 11,
    rating: "4.8",
  },
  {
    name: "Farhana Akter",
    area: "Dhap, Rangpur",
    specialty: "Cameras & Studio Lighting",
    listings: 9,
    rating: "5.0",
  },
];
