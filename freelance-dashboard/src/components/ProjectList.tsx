// src/components/ProjectList.tsx
import React from "react";
import { Project } from "../models/models";
import { useAppState } from "../context/AppStateContext";

interface Props {
  projects: Project[];
}

const ProjectList: React.FC<Props> = ({ projects }) => {
  const { state, dispatch } = useAppState();

  const handleMarkPaid = (projectId: string) => {
    const project = state.projects.find((p) => p.id === projectId);
    if (!project) return alert("Project not found");

    const payment = {
      projectId,
      amount: project.budget,
      date: new Date().toISOString(),
    };

    dispatch({ type: "MARK_PROJECT_PAID", payload: { projectId, payment } });
  };

  return (
    <div>
      {projects.map((p) => (
        <div key={p.id} className="p-3 mb-2 border rounded flex justify-between items-center">
          <div>
            <h4 className="font-medium">{p.title}</h4>
            <p>Budget: ${p.budget}</p>
            <p>Status: <span className={`font-semibold`}>{p.status}</span></p>
            <p>
              Payment:{" "}
              <span className={p.paymentStatus === "paid" ? "text-green-600" : "text-red-600"}>
                {p.paymentStatus}
              </span>
            </p>
          </div>

          <div>
            {p.paymentStatus === "unpaid" ? (
              <button
                onClick={() => handleMarkPaid(p.id)}
                className="px-3 py-1 bg-blue-600 text-white rounded"
              >
                Mark Paid
              </button>
            ) : (
              <span className="text-sm text-gray-500">Paid</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
