// src/components/DashboardStats.tsx
import React from "react";
import { useAppState } from "../context/AppStateContext";
import { countPaymentStates } from "../utils/Utils";

const DashboardStats: React.FC = () => {
  const { state } = useAppState();
  const totalProjects = state.projects.length;
  const { paid, unpaid } = countPaymentStates(state.projects);
  const totalClients = state.clients.length;

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-3 border rounded">
        <div className="text-sm">Clients</div>
        <div className="text-2xl font-bold">{totalClients}</div>
      </div>
      <div className="p-3 border rounded">
        <div className="text-sm">Projects</div>
        <div className="text-2xl font-bold">{totalProjects}</div>
      </div>
      <div className="p-3 border rounded">
        <div className="text-sm">Payments (paid / unpaid)</div>
        <div className="text-2xl font-bold">{paid} / {unpaid}</div>
      </div>
    </div>
  );
};

export default DashboardStats;
