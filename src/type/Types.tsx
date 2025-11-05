// src/types/Types.ts
export type ProjectStatus = 'pending' | 'in-progress' | 'completed';
export type PaymentState = 'paid' | 'unpaid';

export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string;
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
  date: string; // ISO format
}

// State interface for Context
export interface AppState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

// Discriminated union types for actions
export type AppAction =
  | { type: 'ADD_CLIENT'; payload: Client }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'ADD_PAYMENT'; payload: Payment }
  | { type: 'MARK_PROJECT_PAID'; payload: { projectId: string; payment: Payment } }
  | { type: 'SET_INITIAL_DATA'; payload: AppState };