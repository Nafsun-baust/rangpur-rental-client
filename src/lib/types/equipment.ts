export type RentalType = "Daily" | "Weekly" | "Monthly";
export type EquipmentStatus = "pending" | "approved" | "rejected";

export interface EquipmentItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  location: string;
  rentalPrice: number;
  rentalType: RentalType;
  availableQuantity: number;
  condition: string;
  brand: string;
  model: string;
  image: string;
  terms: string;
  status: EquipmentStatus;
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  ownerImage?: string;
  createdAt?: string;
  updatedAt?: string;
}