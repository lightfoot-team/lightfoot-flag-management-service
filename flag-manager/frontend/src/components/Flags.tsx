import { useState, useEffect } from "react";
import { type FlagDetails } from "../types/flagTypes";
import { getAllFlags, deleteFlag, toggleFlag } from "../services/flags";
import FlagListItem from "./FlagListItem";
import Modal from "./Modal";
import NewFlagForm from "./NewFlagForm";

const Flags = () => {
  const [flags, setFlags] = useState<Array<FlagDetails>>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add")

  useEffect(() => {
    const fetchFlags = async () => {
      const response = await getAllFlags();
      setFlags(response.data)
    }
    fetchFlags()
  }, []);

  const handleDeleteFlag = (flagKey: string) => {
    deleteFlag(flagKey);
    const newFlags = flags.filter(flag => flag.flagKey != flagKey);
    setFlags(newFlags);
  }

  const handleToggleFlag = (flagKey: string) => {
    toggleFlag(flagKey);
    const newFlags = flags.map(flag => {
      if (flag.flagKey === flagKey) {
        flag.isEnabled = !flag.isEnabled;
      }
      return flag;
    });

    setFlags(newFlags);
  }

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 pr-4">
          <h1 className="text-3xl font-bold text-gray-800">Feature Flags</h1>
          {/* <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
            onClick={() => setIsModalOpen(true)}
          >
            New Flag
          </button> */}
          <button
            className="px-4 py-2 rounded-md text-base bg-blue-200 text-blue-1000 hover:bg-blue-300 transition"
            onClick={() => setIsModalOpen(true)}
          >
            New Flag
          </button>
        </div>

        <div className="space-y-4">
          {flags.map((flag) => (
            <FlagListItem
              key={flag.flagKey}
              flagDetails={flag}
              onDeleteFlag={handleDeleteFlag}
              onToggleFlag={handleToggleFlag}
            />
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {modalMode === "add" ? <NewFlagForm onClose={() => setIsModalOpen(false)} /> : null}
      </Modal>
    </>
  );
}

export default Flags;