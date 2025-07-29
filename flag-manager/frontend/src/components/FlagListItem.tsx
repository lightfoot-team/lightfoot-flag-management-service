import { type FlagDetails } from "../types/flagTypes";
//import { type UserEvaluationContext } from "../types/evaluationTypes";
//import NewRuleForm from "./NewRuleForm";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import EditVariantsForm from "./EditVariantsForm";
import NewFlagForm from "./NewFlagForm";
// import FlagView from "./FlagView";
interface FlagListItemProps {
  flagDetails: FlagDetails;
  onDeleteFlag: (flagKey: string) => void;
  onToggleFlag: (flagKey: string) => void;
  onClose: () => void;
  onEdit: () => void;
  modalMode: string;
  isModalOpen: boolean;
}

const FlagListItem: React.FC<FlagListItemProps> = (props: FlagListItemProps) => {
  const { flagDetails, onDeleteFlag, onToggleFlag, onClose, onEdit, modalMode, isModalOpen} = props;
  return (
    <div className="flex justify-between items-center bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition mb-4">
      <Link
        to={`/flags/${flagDetails.flagKey}`}
        className="text-lg font-semibold text-gray-800 hover:underline"
      >
        {flagDetails.flagKey}{" "}
      </Link>

      <div className="flex gap-2">
        <div className="flex items-center gap-2 cursor-pointer" 
            role="switch" 
            aria-checked={flagDetails.isEnabled} 
            tabIndex={0}
            onClick={() => onToggleFlag(flagDetails.flagKey)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onToggleFlag(flagDetails.flagKey);
              }
            }}
        >
          <div
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
              flagDetails.isEnabled ? "bg-yellow-500" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                flagDetails.isEnabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </div>
          <span className={`select-none text-sm font-medium ${
            flagDetails.isEnabled ? "text-yellow-600" : "text-gray-600"
          }`}>
            {flagDetails.isEnabled ? "Enabled" : "Disabled"}
          </span>
        </div>

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
        {modalMode === "add" ? <NewFlagForm onClose={onClose} />
          : <EditVariantsForm onClose={onClose} flagDetails={flagDetails}/>}
      </Modal>
    </div>
  );
}

export default FlagListItem;