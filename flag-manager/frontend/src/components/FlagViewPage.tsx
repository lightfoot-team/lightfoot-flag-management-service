import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FlagView from "./FlagView";
import { type FlagDetails } from "../types/flagTypes";
import { getFlag } from "../services/flags";

interface FlagViewPageProps {
  flagDashboardLoaded: boolean;
  onToggle: (flagKey: string) => void;
  onDelete: (flagKey: string) => void;
}

const FlagViewPage = (props: FlagViewPageProps) => {
  const {flagDashboardLoaded, onToggle, onDelete} = props;
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
  if (!flagDetails) return <div>Flag Not Found</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Flag: <span className="font-mono text-blue-600">{flagDetails.flagKey}</span>
        </h1>
        <div className="flex gap-6 items-center">
          <div
            className="flex items-center gap-3 cursor-pointer"
            role="switch"
            aria-checked={flagDetails.isEnabled}
            tabIndex={0}
            onClick={() => {
              onToggle(flagDetails.flagKey);
              setFlagDetails({
                ...flagDetails,
                isEnabled: !flagDetails.isEnabled
              });
            }}
          >
            <div
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                flagDetails.isEnabled ? "bg-yellow-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  flagDetails.isEnabled ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </div>
            <span
              className={`text-md font-medium ${
                flagDetails.isEnabled ? "text-yellow-600" : "text-gray-600"
              }`}
            >
              {flagDetails.isEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>

          <button
            onClick={() => onDelete(flagDetails.flagKey) }
            className="px-5 py-2 rounded-md text-md font-medium bg-red-100 text-red-800 hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>

      <FlagView
        flagDetails={flagDetails}
        flagDashboardLoaded={flagDashboardLoaded}
      />
    </div>
  );

};

export default FlagViewPage;
