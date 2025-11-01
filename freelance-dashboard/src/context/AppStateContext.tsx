// src/context/AppStateContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { Client, Project, Payment } from "../models/models";
import { initialClients, initialProjects, initialPayments } from "../data/seed";
import { recordPaymentValidate } from "../utils/utils";

// State type
export interface AppState {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
}

// Discriminated union actions
export type Action =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "MARK_PROJECT_PAID"; payload: { projectId: string; payment: Payment } }
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: Project["status"] } };

// initial state
const initialState: AppState = {
  clients: initialClients,
  projects: initialProjects,
  payments: initialPayments,
};

const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_CLIENT":
      return { ...state, clients: [...state.clients, action.payload] };

    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };

    case "ADD_PAYMENT":
      // Add payment but do NOT change project paymentStatus here automatically
      return { ...state, payments: [...state.payments, action.payload] };

    case "MARK_PROJECT_PAID": {
      const { projectId, payment } = action.payload;

      // Validation: ensure payment is valid before applying
      if (!recordPaymentValidate(payment)) {
        console.error("Invalid payment record:", payment);
        return state; // no change
      }

      const updatedProjects = state.projects.map((p) =>
        p.id === projectId ? { ...p, paymentStatus: "paid" } : p
      );

      return {
        ...state,
        projects: updatedProjects,
        payments: [...state.payments, payment],
      };
    }

    case "UPDATE_PROJECT_STATUS": {
      const { projectId, status } = action.payload;
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === projectId ? { ...p, status } : p)),
      };
    }

    default:
      return state;
  }
}

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => useContext(AppStateContext);
