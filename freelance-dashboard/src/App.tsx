// src/App.tsx
import React, { useState } from "react";
import { AppStateProvider, useAppState } from "./context/AppStateContext";
import ClientCard from "./components/ClientCard";
import ProjectList from "./components/ProjectList";
import DashboardStats from "./components/DashboardStats";
import { searchByName, filterProjects } from "./utils/Utils";

const InnerApp: React.FC = () => {
  const { state } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState<{ status?: string; paymentState?: string }>({});

  const searchedClients = searchByName(state.clients, searchTerm);
  const searchedProjects = searchByName(state.projects, searchTerm);
  const filteredProjects = filterProjects(state.projects, {
    status: projectFilter.status as any,
    paymentState: projectFilter.paymentState as any,
  });

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Freelance Dashboard</h1>

      <DashboardStats />

      <div className="flex gap-4">
        <input
          placeholder="Search clients or projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        <select onChange={(e) => setProjectFilter({ status: e.target.value || undefined })} className="border p-2 rounded">
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In-progress</option>
          <option value="completed">Completed</option>
        </select>

        <select onChange={(e) => setProjectFilter((s) => ({ ...s, paymentState: e.target.value || undefined }))} className="border p-2 rounded">
          <option value="">All payment</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
        </select>
      </div>

      <section>
        <h2 className="text-xl font-semibold">Clients</h2>
        <div className="grid grid-cols-2 gap-4 mt-2">
          {searchedClients.length ? searchedClients.map((c) => <ClientCard key={c.id} client={c} />) : <p>No clients found.</p>}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Projects</h2>
        <div className="mt-2">
          <ProjectList projects={filteredProjects.length ? filteredProjects : searchedProjects.length ? searchedProjects : state.projects} />
        </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <AppStateProvider>
      <InnerApp />
    </AppStateProvider>
  );
}

export default App;

