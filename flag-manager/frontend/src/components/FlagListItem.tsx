import { type FlagDetails } from "../types/flagTypes";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import EditVariantsForm from "./EditVariantsForm";
import NewFlagForm from "./NewFlagForm";
import ToggleButton from "./ToggleButton";
import { getFlag } from "../services/flags";


interface FlagListItemProps {
  flagDetails: FlagDetails;
  onDeleteFlag: (flagKey: string) => void;
  onToggleFlag: (flagKey: string) => void;
  onClose: () => void;
  onEdit: () => void;
  modalMode: string;
  isModalOpen: boolean;
  onAddFlag: (newFlag: FlagDetails) => void;
  onUpdateFlag: (updatedFlag: FlagDetails) => void;
}

const FlagListItem: React.FC<FlagListItemProps> = ({
  flagDetails,
  onDeleteFlag,
  onToggleFlag,
  onClose,
  onEdit,
  modalMode,
  isModalOpen,
  onAddFlag,
  onUpdateFlag
}) => {
  const handleSubmitEdit = async () => {
    try {
      const response = await getFlag(flagDetails.flagKey);
      onUpdateFlag(response.data);
      onClose();
    } catch (e) {
      console.error("Error refreshing updated flag", e);
    }
  };


  return (
    <div className="flex justify-between items-center bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition mb-4">
      <Link
        to={`/flags/${flagDetails.flagKey}`}
        className="text-lg font-semibold text-gray-800 hover:underline"
      >
        {flagDetails.flagKey}{" "}
      </Link>

      <div className="flex gap-2">
        <ToggleButton
          isEnabled={flagDetails.isEnabled}
          onToggle={() => {
            onToggleFlag(flagDetails.flagKey);
          }}
          size="sm"
        />
        <button
          onClick={onEdit}
          className="px-3 py-1 rounded-md text-sm font-medium bg-blue-200 text-blue-800 hover:bg-blue-300 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteFlag(flagDetails.flagKey)}
          className="px-3 py-1 rounded-md text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition"
        >
          Delete
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        {modalMode === "add" ? <NewFlagForm onClose={onClose} onAddFlag={onAddFlag} />
          : <EditVariantsForm onSubmitEdit={handleSubmitEdit} onCancel={onClose} flagDetails={flagDetails}/>}
      </Modal>
    </div>
  );
};

export default FlagListItem;