/* eslint-disable react-refresh/only-export-components */

// src/context/AppStateContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { AppState, AppAction } from '../type/Types';

// Initial state with sample data
const initialState: AppState = {
  clients: [
    {
      id: 'c1',
      name: 'Tech Solutions Inc',
      country: 'USA',
      email: 'contact@techsolutions.com'
    },
    {
      id: 'c2',
      name: 'Global Designs',
      country: 'UK',
    }
  ],
  projects: [
    {
      id: 'p1',
      clientId: 'c1',
      title: 'Website Redesign',
      budget: 5000,
      status: 'in-progress',
      paymentStatus: 'unpaid'
    },
    {
      id: 'p2',
      clientId: 'c2',
      title: 'Mobile App Development',
      budget: 12000,
      status: 'completed',
      paymentStatus: 'paid'
    }
  ],
  payments: [
    {
      projectId: 'p2',
      amount: 12000,
      date: '2024-10-15T10:30:00.000Z'
    }
  ]
};

// Reducer function with discriminated unions
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_CLIENT':
      return {
        ...state,
        clients: [...state.clients, action.payload]
      };

    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [...state.projects, action.payload]
      };

    case 'ADD_PAYMENT':
      return {
        ...state,
        payments: [...state.payments, action.payload]
      };

    case 'MARK_PROJECT_PAID':
      return {
        ...state,
        projects: state.projects.map(project =>
          project.id === action.payload.projectId
            ? { ...project, paymentStatus: 'paid' as const }
            : project
        ),
        payments: [...state.payments, action.payload.payment]
      };

    case 'SET_INITIAL_DATA':
      return action.payload;

    default:
      return state;
  }
}

// Context type
interface AppStateContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

// Create context
const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

// Provider component
export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

// Custom hook to use the context
export function useAppState(): AppStateContextType {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}