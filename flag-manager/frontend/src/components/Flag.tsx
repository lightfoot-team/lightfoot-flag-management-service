import { type FlagDetails } from "../types/flagTypes";
import { type UserEvaluationContext } from "../types/evaluationTypes";
import NewRuleForm from "./NewRuleForm";
interface FlagProps {
  flagDetails: FlagDetails;
  onDeleteFlag: (flagKey: string) => void;
  onToggleFlag: (flagKey: string) => void;
}

const testUserEvaluationContext: UserEvaluationContext = {
  targetingKey: '',
  kind: 'user',
  name: '',
  email: '',
  location: ''
}
const Flag:React.FC<FlagProps> = ({ flagDetails, onDeleteFlag, onToggleFlag }) => {

  return (
    <div>
      <p>Key: {flagDetails.flagKey}</p>
      <p>Type: {flagDetails.flagType}</p>
      <p>Variants: {JSON.stringify(flagDetails.variants)}</p>
      <p>Flag status: {flagDetails.isEnabled ? "ON" : "OFF"}</p>
      <p>{`Created at:
        ${new Date(flagDetails.createdAt).toLocaleTimeString()}
        ${new Date(flagDetails.createdAt).toLocaleDateString()}
        `}
      </p>

      {flagDetails.updatedAt && <p>updated at: {flagDetails.updatedAt}</p>}
      <p>default variant: {flagDetails.defaultVariant}</p>
      <div>
        <button onClick={() => onDeleteFlag(flagDetails.flagKey)}>Delete Feature</button>
        <button onClick={() => onToggleFlag(flagDetails.flagKey)}>Toggle Feature ON/OFF</button>
      </div>
        <NewRuleForm flag={flagDetails} contextKinds={[testUserEvaluationContext]}></NewRuleForm>
    </div>
  );
}

export default Flag;