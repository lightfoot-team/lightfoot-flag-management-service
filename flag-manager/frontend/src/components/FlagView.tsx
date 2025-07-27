import { type FlagDetails } from "../types/flagTypes";
import { type UserEvaluationContext } from "../types/evaluationTypes";
import NewRuleForm from "./NewRuleForm";
import FlagDashboard from "./FlagDashboard";

     
interface FlagProps {
  flagDetails: FlagDetails;
  // onDeleteFlag: (flagKey: string) => void;
  // onToggleFlag: (flagKey: string) => void;
}

const testUserEvaluationContext: UserEvaluationContext = {
  targetingKey: '',
  kind: 'user',
  name: '',
  email: '',
  location: ''
}
const FlagView:React.FC<FlagProps> = ({ flagDetails }) => {

  return (
    <div className="space-y-8">
  
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
      </section>

      <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <NewRuleForm flag={flagDetails} contextKinds={[testUserEvaluationContext]} />
      </section>

      <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <FlagDashboard flagKey={flagDetails.flagKey} />
      </section>
    </div>
  );
}

export default FlagView;