import { useState } from "react";
import { type FlagDetails } from "../types/flagTypes";
import FlagListItem from "./FlagListItem";
import EmptyFlagsList from "./EmptyFlagsList";

interface FlagsProps {
  flags: FlagDetails[];
  onToggle: (flayKey: string) => void;
  onDelete: (flayKey: string) => void;
  onAddFlag: (newFlag: FlagDetails) => void;
  onUpdateFlag: (updatedFlag: FlagDetails) => void;
}

const Flags:React.FC<FlagsProps> = ({ flags, onToggle, onDelete, onAddFlag, onUpdateFlag }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")

  const handleNewFlagClick = () => {
    setModalMode("add");
    setIsModalOpen(true);
  }

  const handleEditClick = () => {
    setModalMode("edit");
    setIsModalOpen(true);
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 pr-4">
          <h1 className="text-3xl font-bold text-gray-800">Feature Flags</h1>
          <button
            className="px-4 py-2 rounded-md text-base bg-blue-200 text-blue-1000 hover:bg-blue-300 transition"
            onClick={handleNewFlagClick}
          >
            New Flag
          </button>
        </div>

        {flags.length > 0 ? (<div className="space-y-4">
          {flags.map((flag) => (
            <FlagListItem
              key={flag.flagKey}
              flagDetails={flag}
              onDeleteFlag={onDelete}
              onToggleFlag={onToggle}
              onClose={() => setIsModalOpen(false)}
              modalMode={modalMode}
              onEdit={handleEditClick}
              isModalOpen={isModalOpen}
              onAddFlag={onAddFlag}
              onUpdateFlag={onUpdateFlag}
            />
          ))}
        </div>)
        : 
        <EmptyFlagsList onClose={() => setIsModalOpen(false)} isModalOpen={isModalOpen} onAddFlag={onAddFlag}/>
        }
      </div>
    </>
  );
}

export default Flags;