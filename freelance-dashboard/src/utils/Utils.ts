// src/utils/utils.ts
import { Client, Payment, Project } from "../models/models";

/** Count paid vs unpaid projects */
export function countPaymentStates(projects: Project[]) {
  return projects.reduce(
    (acc, p) => {
      if (p.paymentStatus === "paid") acc.paid += 1;
      else acc.unpaid += 1;
      return acc;
    },
    { paid: 0, unpaid: 0 }
  );
}

/** Find client by ID safely */
export function findClientById(clients: Client[], id?: string) {
  if (!id) return null;
  return clients.find((c) => c.id === id) ?? null;
}

/** Validate payment record */
export function recordPaymentValidate(payment: Payment): payment is Payment {
  if (!payment) return false;
  if (typeof payment.projectId !== "string") return false;
  if (typeof payment.amount !== "number" || isNaN(payment.amount) || payment.amount <= 0) return false;
  if (typeof payment.date !== "string") return false;
  // further ISO validation optional
  return true;
}

/** Filter projects by status or payment state */
export function filterProjects(
  projects: Project[],
  filter: { status?: Project["status"]; paymentState?: Project["paymentStatus"] }
) {
  return projects.filter((p) => {
    if (filter.status && p.status !== filter.status) return false;
    if (filter.paymentState && p.paymentStatus !== filter.paymentState) return false;
    return true;
  });
}

/** Search clients or projects by name (case-insensitive) */
export function searchByName<T extends { name?: string; title?: string }>(
  items: T[],
  term: string
) {
  const q = term.trim().toLowerCase();
  if (!q) return items;
  return items.filter((it) => {
    const name = (it.name ?? it.title ?? "").toLowerCase();
    return name.includes(q);
  });
}
