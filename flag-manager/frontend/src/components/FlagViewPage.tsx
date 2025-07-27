import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FlagView from "./FlagView";
import { type FlagDetails } from "../types/flagTypes";
import { getFlag } from "../services/flags";

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

  // change this to be separate loading page and error page
  if (!flagDetails) return <div>Loading or Flag Not Found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-4xl p-8">
        <h1 className="text-3xl font-semibold text-blue-700 mb-6">
          Flag: {flagDetails.flagKey}
        </h1>
        <FlagView
          flagDetails={flagDetails}
        />
      </div>
    </div>
  );
};

export default FlagViewPage;
