// src/App.tsx
import React, { useState } from "react";
import { AppStateProvider, useAppState } from "./context/AppStateContext";
import ClientCard from "./components/ClientCard";
import ProjectList from "./components/ProjectList";
import DashboardStats from "./components/DashboardStats";
import { searchByName, filterProjects } from "./utils/Utils";
import type { ProjectStatus, PaymentState } from "./type/Types";

/**
 * Inner App Component
 * Main dashboard interface with search and filter functionality
 */
const InnerApp: React.FC = () => {
  const { state } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "">("");
  const [paymentFilter, setPaymentFilter] = useState<PaymentState | "">("");

  // Search functionality
  const searchedClients = searchByName(state.clients, searchTerm);
  const searchedProjects = searchByName(state.projects, searchTerm);

  // Filter projects by status and payment state
  const filteredProjects = filterProjects(
    searchTerm ? searchedProjects : state.projects,
    {
      status: statusFilter || undefined,
      paymentState: paymentFilter || undefined,
    }
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8">
        {/* Header with gradient background */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 md:p-12 rounded-2xl shadow-2xl">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
              Freelance Dashboard
            </h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              Manage your clients, projects, and payments with complete TypeScript type safety
            </p>
          </div>
          {/* Decorative elements */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
        </div>

        {/* Dashboard Statistics */}
        <DashboardStats />

        {/* Search and Filter Controls with glass morphism */}
        <div className="backdrop-blur-lg bg-white/70 p-6 rounded-2xl shadow-xl border border-white/50">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search & Filter
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search clients or projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border-2 border-gray-200 bg-white p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as ProjectStatus | "")}
              className="border-2 border-gray-200 bg-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <option value="">All Project Status</option>
              <option value="pending">⏳ Pending</option>
              <option value="in-progress">🚀 In Progress</option>
              <option value="completed">✅ Completed</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value as PaymentState | "")}
              className="border-2 border-gray-200 bg-white p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              <option value="">All Payment Status</option>
              <option value="paid">💰 Paid</option>
              <option value="unpaid">⏰ Unpaid</option>
            </select>
          </div>
        </div>

        {/* Clients Section */}
        <section className="backdrop-blur-lg bg-white/70 p-6 md:p-8 rounded-2xl shadow-xl border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Clients</h2>
            <span className="ml-auto bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {searchedClients.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchedClients.length > 0 ? (
              searchedClients.map((client) => (
                <ClientCard key={client.id} client={client} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-3">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-gray-500 text-lg font-medium">No clients found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search</p>
              </div>
            )}
          </div>
        </section>

        {/* Projects Section */}
        <section className="backdrop-blur-lg bg-white/70 p-6 md:p-8 rounded-2xl shadow-xl border border-white/50">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
            <span className="ml-auto bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
              {filteredProjects.length}
            </span>
          </div>
          <ProjectList projects={filteredProjects} />
        </section>
      </div>
    </div>
  );
};

/**
 * Main App Component
 * Wraps application with AppStateProvider for global state management
 */
function App() {
  return (
    <AppStateProvider>
      <InnerApp />
    </AppStateProvider>
  );
}

export default App;
