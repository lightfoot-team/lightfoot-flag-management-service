import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FlagDashboard from "./FlagDashboard";
import EditVariantsForm from "./EditVariantsForm";
import NewRuleForm from "./NewRuleForm";
import ToggleButton from "./ToggleButton";
import Rules from "./Rules";
import { type FlagDetails } from "../types/flagTypes";
import type { EvaluationRule, EvaluationRuleInsertion } from "../types/evaluationTypes";
import { getFlag } from "../services/flags";
import { deleteRule, getRulesByFlagKey } from "../services/rules";

interface FlagPageProps {
  flagDashboardLoaded: boolean;
  onToggle: (flagKey: string) => void;
  onDelete: (flagKey: string) => void;
}

const FlagPage:React.FC<FlagPageProps> = ({flagDashboardLoaded, onToggle, onDelete}) => {
  const { flagKey } = useParams<{ flagKey: string }>();
  const [flagDetails, setFlagDetails] = useState<FlagDetails | null>(null);
  const [ isEditingVariants, setIsEditingVariants ] = useState(false);
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [rules, setRules] = useState<Array<EvaluationRule | EvaluationRuleInsertion>>([]);


  useEffect(() => {
    const fetchFlag = async () => {
      const response = await getFlag(flagKey as string);
      setFlagDetails(response.data);
    };

    fetchFlag();
  }, [flagKey]);

  useEffect(()=> {
    const fetchRules = async () => {
      const loadedRules = await getRulesByFlagKey(flagKey as string) as Array<EvaluationRule>;
      setRules(loadedRules)
    }
    fetchRules()
  }, [flagKey]);

  const handleOpenEdit = () => {
    setIsEditingVariants(true);
  };

  const handleCancelEdit = () => {
    setIsEditingVariants(false);
  };

  const handleSubmitEdit = async () => {
    const fetchFlag = async () => {
      const response = await getFlag(flagKey as string);
      setFlagDetails(response.data);
    };

    await fetchFlag();
    setIsEditingVariants(false);
  };

  const handleDeleteRule = async (ruleId: string, ruleName: string) => {
    if (confirm('Are you sure you want to delete the rule?')) {
      try {
        await deleteRule(ruleId, ruleName);
        const newRules = rules.filter(rule => rule.name !== ruleName);
        setRules(newRules); 
      } catch (e) {
        console.error("Error deleting rule:", e)
      }
    }
  };

  const handleAddRule = async (newRule: EvaluationRuleInsertion) => {
    setRules(prev => [...prev, newRule]);
  };

  if (!flagDetails) return <div>Loading...</div>;

  return (
    <div className="max-w-full mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl text-gray-800 font-bold">
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
            onSubmitEdit={handleSubmitEdit}
            onCancel={handleCancelEdit}
          />
        ) : (
        <section className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Variants:</h2>
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
          <div><h2 className="text-xl font-semibold text-gray-800 mb-4">Default Variant: <span className="font-mono text-blue-600">{flagDetails.defaultVariant}</span></h2></div>
          <div className="mt-4">
            <button
              className="px-4 py-2 rounded-md text-base bg-blue-200 text-blue-1000 hover:bg-blue-300 transition"
              onClick={handleOpenEdit}
            >
              Edit Variants
            </button>
          </div>
        </section>
        )}


        <section className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
          <Rules 
            flagKey={flagKey as string} 
            onDeleteRule={handleDeleteRule} 
            rules={rules}
          />
          {isAddingRule ? (
            <>
              <h2 className="text-xl font-semibold text-blue-700 mb-4">Add New Rule</h2>
              <NewRuleForm
                flag={flagDetails}
                onClose={() => setIsAddingRule(false)}
                onAddRule={handleAddRule}
              />
            </>
          ) : (
            <button
              onClick={() => setIsAddingRule(true)}
              className="px-4 py-2 rounded-md text-base bg-blue-200 text-blue-1000 hover:bg-blue-300 transition"
            >
              Add Rule
            </button>
          )}
        </section>

        <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <FlagDashboard flagKey={flagDetails.flagKey} flagDashboardLoaded={flagDashboardLoaded} />
        </section>
      </div>
    </div>
  );
};

export default FlagPage;
