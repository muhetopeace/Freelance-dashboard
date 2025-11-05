// src/components/ClientCard.tsx
import React from "react";
import { Client } from "../type/Types";

interface Props {
  client: Client;
}

/**
 * ClientCard Component
 * Displays client information with typed props
 * Handles optional email property safely
 */
const ClientCard: React.FC<Props> = ({ client }) => {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 p-5 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-blue-100 hover:border-blue-300 transform hover:-translate-y-1">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-indigo-400/0 group-hover:from-blue-400/5 group-hover:to-indigo-400/10 transition-all duration-300"></div>
      
      <div className="relative z-10">
        {/* Header with icon */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">
                {client.name.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
                {client.name}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-gray-600 font-medium">{client.country}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Email section */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {client.email ? (
              <a 
                href={`mailto:${client.email}`} 
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors truncate"
              >
                {client.email}
              </a>
            ) : (
              <em className="text-sm text-gray-400 italic">No email provided</em>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientCard;
