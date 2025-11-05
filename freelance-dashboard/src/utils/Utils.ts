// src/utils/Utils.ts
import { Client, Project, Payment } from '../type/Types';

/**
 * Count paid vs unpaid projects
 * Provides insight into project/payment status
 */
export function countPaymentStates(projects: Project[]): { paid: number; unpaid: number } {
  return projects.reduce(
    (acc, project) => {
      if (project.paymentStatus === 'paid') {
        acc.paid += 1;
      } else {
        acc.unpaid += 1;
      }
      return acc;
    },
    { paid: 0, unpaid: 0 }
  );
}

/**
 * Find client by ID safely
 * Ensures safe access to client data without runtime errors
 * Uses type narrowing to handle undefined cases
 */
export function findClientById(clients: Client[], id?: string): Client | null {
  // Type narrowing: check if id exists
  if (!id) return null;
  
  const client = clients.find(c => c.id === id);
  return client ?? null;
}

/**
 * Validate payment record
 * Lets users update project payments while enforcing type safety
 */
export function isValidPayment(payment: Payment): payment is Payment {
  if (!payment) return false;
  if (typeof payment.projectId !== 'string' || payment.projectId.trim() === '') return false;
  if (typeof payment.amount !== 'number' || isNaN(payment.amount) || payment.amount <= 0) return false;
  if (typeof payment.date !== 'string' || payment.date.trim() === '') return false;
  
  // Validate ISO date format
  const date = new Date(payment.date);
  if (isNaN(date.getTime())) return false;
  
  return true;
}

/**
 * Filter projects by status or payment state
 * Lets users view projects based on conditions
 */
export function filterProjects(
  projects: Project[],
  filter: { status?: Project['status']; paymentState?: Project['paymentStatus'] }
): Project[] {
  return projects.filter(project => {
    if (filter.status && project.status !== filter.status) return false;
    if (filter.paymentState && project.paymentStatus !== filter.paymentState) return false;
    return true;
  });
}

/**
 * Search clients or projects by name
 * Adds interactivity to quickly find data
 * Uses generics for reusable functionality
 */
export function searchByName<T extends { name?: string; title?: string }>(
  items: T[],
  term: string
): T[] {
  const query = term.trim().toLowerCase();
  if (!query) return items;

  return items.filter(item => {
    const searchableText = (item.name ?? item.title ?? '').toLowerCase();
    return searchableText.includes(query);
  });
}

/**
 * Get project status color class
 * Conditional styling to indicate project status
 */
export function getProjectStatusColor(status: Project['status']): string {
  switch (status) {
    case 'pending':
      return 'text-yellow-600';
    case 'in-progress':
      return 'text-blue-600';
    case 'completed':
      return 'text-green-600';
    default:
      return 'text-gray-600';
  }
}

/**
 * Get payment status color class
 * Conditional styling to indicate payment status
 */
export function getPaymentStatusColor(paymentStatus: Project['paymentStatus']): string {
  return paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600';
}

/**
 * Format currency
 * Helper function to display budget amounts
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

/**
 * Format date
 * Helper function to display dates in readable format
 */
export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}