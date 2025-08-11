import type { FlagDetails } from "../types/flagTypes";
import Modal from "./Modal";
import NewFlagForm from "./NewFlagForm";

interface EmptyFlagsListProps {
  onClose: () => void;
  isModalOpen: boolean;
  onAddFlag: (newFlag: FlagDetails) => void;
}

const EmptyFlagsList:React.FC<EmptyFlagsListProps> = ({onClose, isModalOpen, onAddFlag}) => {

  return (
    <div>
      <p>No Flags</p>
      <Modal isOpen={isModalOpen} onClose={onClose}>
        <NewFlagForm onClose={onClose} onAddFlag={onAddFlag} />
      </Modal>
    </div>
  );
};

export default EmptyFlagsList;