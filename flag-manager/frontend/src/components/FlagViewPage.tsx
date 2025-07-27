import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FlagView from "./FlagView";
import { type FlagDetails } from "../types/flagTypes";
import { getFlag, deleteFlag, toggleFlag } from "../services/flags";

const FlagViewPage = () => {
  const { flagKey } = useParams<{ flagKey: string }>();
  const [flagDetails, setFlagDetails] = useState<FlagDetails | null>(null);

  useEffect(() => {
    const fetchFlag = async () => {
      const response = await getFlag(flagKey as string);
      setFlagDetails(response.data);
    };

    fetchFlag();
  }, [flagKey]);

  const handleDeleteFlag = async (flagKey: string) => {
    await deleteFlag(flagKey);
    // redirect to flag list? or show message that flag was deleted?
  };

  const handleToggleFlag = async (flagKey: string) => {
    await toggleFlag(flagKey);
    setFlagDetails((prev) =>
      prev ? { ...prev, isEnabled: !prev.isEnabled } : prev
    );
  };

  // change this to be separate loading page and error page
  if (!flagDetails) return <div>Loading or Flag Not Found</div>;

  return (
    <FlagView
      flagDetails={flagDetails}
      onDeleteFlag={handleDeleteFlag}
      onToggleFlag={handleToggleFlag}
    />
  );
};

export default FlagViewPage;
