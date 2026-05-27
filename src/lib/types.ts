export enum UserRole {
  CLIENT = "CLIENT",
  MODEL = "MODEL",
  ADMIN = "ADMIN",
}

export enum ModelType {
  ACOMPANANTE = "ACOMPANANTE",
  TRAVESTI = "TRAVESTI",
  MASAJISTA = "MASAJISTA",
}

export enum ReservationStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  REFUNDED = "REFUNDED",
  FAILED = "FAILED",
}

export interface City {
  id: string;
  name: string;
  state: string;
}

export interface Zone {
  id: string;
  name: string;
  cityId: string;
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
}

export interface ModelProfile {
  id: string;
  userId: string;
  cityId: string;
  city?: City;
  zoneId?: string;
  zone?: Zone;
  name: string;
  tagline?: string;
  bio?: string;
  age: number;
  type: ModelType;
  ethnicity?: string;
  height?: number;
  weight?: number;
  languages: string[];
  mainPhoto: string;
  gallery: string[];
  rating: number;
  reviewCount: number;
  viewCount: number;
  bookingCount: number;
  verified: boolean;
  services?: ModelService[];
  reviews?: Review[];
}

export interface ModelService {
  id: string;
  modelId: string;
  serviceId: string;
  service?: Service;
  price: number;
}

export interface Review {
  id: string;
  userId: string;
  modelId: string;
  rating: number;
  title?: string;
  content?: string;
  createdAt: Date | string;
  user?: { name?: string };
}

export interface Reservation {
  id: string;
  userId: string;
  modelId: string;
  date: Date | string;
  startTime: string;
  endTime: string;
  address?: string;
  notes?: string;
  status: ReservationStatus;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  model?: ModelProfile;
  user?: { name?: string };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
}

export interface FilterState {
  city?: string;
  type?: ModelType;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  sortBy?: "newest" | "rating" | "price_low" | "price_high";
  search?: string;
}

export type AdminModelItem = Omit<ModelProfile, 'userId' | 'languages'>;
