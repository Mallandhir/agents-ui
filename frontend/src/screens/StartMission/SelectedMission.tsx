import React from "react";

interface SelectedMissionProps {
  selectedMission: string;
}

const SelectedMission: React.FC<SelectedMissionProps> = ({
  selectedMission,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">
        {selectedMission || "Select a Mission"}
      </h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <p className="text-gray-600">
          {selectedMission
            ? `Currently viewing ${selectedMission}`
            : "Please select a mission from the sidebar to view its details"}
        </p>
      </div>
    </div>
  );
};

export default SelectedMission;
