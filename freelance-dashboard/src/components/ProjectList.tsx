// src/components/ProjectList.tsx
import React from "react";
import { Project } from "../type/Types";
import { useAppState } from "../context/AppStateContext";
import { 
  findClientById, 
  formatCurrency,
  isValidPayment
} from "../utils/Utils";

interface Props {
  projects: Project[];
}

/**
 * ProjectList Component
 * Lists projects with their current status and payment state
 * Allows marking unpaid projects as paid
 * Uses conditional styling to indicate status
 */
const ProjectList: React.FC<Props> = ({ projects }) => {
  const { state, dispatch } = useAppState();

  const handleMarkPaid = (projectId: string) => {
    // Find the project
    const project = state.projects.find((p) => p.id === projectId);
    
    // Type narrowing: ensure project exists
    if (!project) {
      alert("Project not found");
      return;
    }

    // Create payment record with validation
    const payment = {
      projectId,
      amount: project.budget,
      date: new Date().toISOString(),
    };

    // Validate payment before dispatching
    if (!isValidPayment(payment)) {
      alert("Invalid payment data");
      return;
    }

    // Dispatch action to mark project as paid
    dispatch({ 
      type: "MARK_PROJECT_PAID", 
      payload: { projectId, payment } 
    });
  };

  // Status badge helper
  const getStatusBadge = (status: Project['status']) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'in-progress': 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200'
    };
    
    const icons = {
      pending: '⏳',
      'in-progress': '🚀',
      completed: '✅'
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        <span>{icons[status]}</span>
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  // Payment badge helper
  const getPaymentBadge = (paymentStatus: Project['paymentStatus']) => {
    if (paymentStatus === 'paid') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
          <span>💰</span>
          <span>Paid</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
        <span>⏰</span>
        <span>Unpaid</span>
      </span>
    );
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-400 mb-4">
          <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg font-medium">No projects found</p>
        <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search term</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {projects.map((project) => {
        // Safe client lookup with type narrowing
        const client = findClientById(state.clients, project.clientId);
        
        return (
          <div 
            key={project.id} 
            className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 transform hover:-translate-y-0.5"
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-purple-400/0 group-hover:from-blue-400/5 group-hover:to-purple-400/5 transition-all duration-300"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1 space-y-3">
                {/* Project Title */}
                <div>
                  <h4 className="font-bold text-xl text-gray-800 group-hover:text-blue-600 transition-colors mb-2">
                    {project.title}
                  </h4>
                  
                  {/* Client Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="font-medium">Client:</span>
                    {client ? (
                      <span className="font-semibold text-gray-800">{client.name}</span>
                    ) : (
                      <em className="text-red-500 font-medium">Client not found</em>
                    )}
                  </div>
                </div>

                {/* Budget */}
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-600">Budget:</span>
                  <span className="text-lg font-bold text-gray-800">{formatCurrency(project.budget)}</span>
                </div>
                
                {/* Status Badges */}
                <div className="flex flex-wrap gap-2 items-center">
                  {getStatusBadge(project.status)}
                  {getPaymentBadge(project.paymentStatus)}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex md:flex-col items-center gap-3">
                {project.paymentStatus === "unpaid" ? (
                  <button
                    onClick={() => handleMarkPaid(project.id)}
                    className="group/btn relative overflow-hidden px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mark Paid
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-xl font-semibold shadow-sm border-2 border-green-200">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Paid
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;
