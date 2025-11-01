// src/data/seed.ts
import { Client, Project, Payment } from "../models/models";

export const initialClients: Client[] = [
  { id: "c1", name: "Amani Digital", country: "Rwanda", email: "info@amani.rw" },
  { id: "c2", name: "Kigali Crafts", country: "Rwanda" }, // no email (optional)
];

export const initialProjects: Project[] = [
  {
    id: "p1",
    clientId: "c1",
    title: "Website Redesign",
    budget: 1200,
    status: "in-progress",
    paymentStatus: "unpaid",
  },
  {
    id: "p2",
    clientId: "c2",
    title: "Shopify Store",
    budget: 800,
    status: "pending",
    paymentStatus: "paid",
  },
];

export const initialPayments: Payment[] = [
  { projectId: "p2", amount: 800, date: new Date().toISOString() },
];
