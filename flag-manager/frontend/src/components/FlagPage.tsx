import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FlagDashboard from "./FlagDashboard";
import EditVariantsForm from "./EditVariantsForm";
import NewRuleForm from "./NewRuleForm";
import ToggleButton from "./ToggleButton";
import { type FlagDetails } from "../types/flagTypes";
import { type UserEvaluationContext } from "../types/evaluationTypes";
import { getFlag } from "../services/flags";

interface FlagPageProps {
  flagDashboardLoaded: boolean;
  onToggle: (flagKey: string) => void;
  onDelete: (flagKey: string) => void;
}

const testUserEvaluationContext: UserEvaluationContext = {
  targetingKey: '',
  kind: 'user',
  name: '',
  email: '',
  location: ''
}

const FlagPage:React.FC<FlagPageProps> = ({flagDashboardLoaded, onToggle, onDelete}) => {
  const { flagKey } = useParams<{ flagKey: string }>();
  const [flagDetails, setFlagDetails] = useState<FlagDetails | null>(null);
  const [ isEditingVariants, setIsEditingVariants ] = useState(false);

  useEffect(() => {
    const fetchFlag = async () => {
      const response = await getFlag(flagKey as string);
      setFlagDetails(response.data);
    };

    fetchFlag();
  }, [flagKey]);

  const handleToggleEditingVariants = () => {
    setIsEditingVariants(!isEditingVariants);
  }

  const handleCancelEdit = () => {
    setIsEditingVariants(false); // Hide edit form without saving
  };

  // change this to be separate loading page and error page
  if (!flagDetails) return <div>Flag Not Found</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Flag: <span className="font-mono text-blue-600">{flagDetails.flagKey}</span>
        </h1>
        <div className="flex gap-6 items-center">
          <div className="text-md">
            <ToggleButton
              isEnabled={flagDetails.isEnabled}
              onToggle={() => {
                onToggle(flagDetails.flagKey);
                setFlagDetails({...flagDetails, isEnabled: !flagDetails.isEnabled})
              }}
              size="lg"
            />
          </div>
          <button
            onClick={() => onDelete(flagDetails.flagKey) }
            className="px-5 py-2 rounded-md text-lg font-medium bg-red-100 text-red-800 hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="space-y-8">
        {isEditingVariants ? (
          <EditVariantsForm
            flagDetails={flagDetails}
            onToggle={handleToggleEditingVariants}
            onCancel={handleCancelEdit}
          />
        ) : (
        <section className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">Variants:</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(flagDetails.variants).map(([variantKey, variantValue]) => (
              <div
                key={variantKey}
                className="bg-white rounded-md p-3 shadow border border-gray-200 flex justify-between items-center"
              >
                <div className="font-medium text-gray-800">{variantKey}</div>
                <div className="text-gray-600">{String(variantValue)}</div>
              </div>
            ))}
          </div>
          <div>
            <button onClick={handleToggleEditingVariants}>Edit Variants</button>
          </div>
        </section>
        )}

        {/* <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <NewRuleForm flag={flagDetails} contextKinds={[testUserEvaluationContext]} />
        </section> */}

        <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <FlagDashboard flagKey={flagDetails.flagKey} flagDashboardLoaded={flagDashboardLoaded} />
        </section>
      </div>

    </div>
  );

};

export default FlagPage;
