// src/components/DashboardStats.tsx
import React from "react";
import { useAppState } from "../context/AppStateContext";
import { countPaymentStates } from "../utils/Utils";

/**
 * DashboardStats Component
 * Display dashboard statistics
 * Shows totals like number of projects, paid/unpaid counts, etc.
 */
const DashboardStats: React.FC = () => {
  const { state } = useAppState();
  const totalProjects = state.projects.length;
  const { paid, unpaid } = countPaymentStates(state.projects);
  const totalClients = state.clients.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Clients Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
          </div>
          <div className="text-sm font-semibold text-blue-100 uppercase tracking-wider mb-2">
            Total Clients
          </div>
          <div className="text-5xl font-extrabold text-white mb-1">{totalClients}</div>
          <div className="text-blue-200 text-sm font-medium">Active partnerships</div>
        </div>
      </div>

      {/* Projects Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="text-sm font-semibold text-purple-100 uppercase tracking-wider mb-2">
            Total Projects
          </div>
          <div className="text-5xl font-extrabold text-white mb-1">{totalProjects}</div>
          <div className="text-purple-200 text-sm font-medium">In pipeline</div>
        </div>
      </div>

      {/* Payments Card */}
      <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-sm font-semibold text-green-100 uppercase tracking-wider mb-2">
            Payment Status
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-5xl font-extrabold text-white">{paid}</span>
            <span className="text-2xl text-green-200 font-bold">/</span>
            <span className="text-3xl font-bold text-green-200">{unpaid}</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-white">Paid</span>
            <span className="text-green-200">/</span>
            <span className="text-green-200">Unpaid</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;