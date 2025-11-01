// src/models/models.ts
export type ProjectStatus = "pending" | "in-progress" | "completed";
export type PaymentState = "paid" | "unpaid";

export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string; // optional
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: ProjectStatus;
  paymentStatus: PaymentState;
}

export interface Payment {
  projectId: string;
  amount: number;
  date: string; // ISO string
}
