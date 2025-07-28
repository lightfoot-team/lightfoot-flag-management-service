import { type FlagDetails } from "../types/flagTypes";
import { type UserEvaluationContext } from "../types/evaluationTypes";
import NewRuleForm from "./Forms/NewRuleForm";
import FlagDashboard from "./FlagDashboard";

     
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
const FlagView:React.FC<FlagProps> = ({ flagDetails, onDeleteFlag, onToggleFlag }) => {

  return (
   <div>
      <h1>{flagDetails.flagKey}</h1>
      <h2>Flag Type: {flagDetails.flagType}</h2>
      <div>
        <button onClick={() => onDeleteFlag(flagDetails.flagKey)}>Delete Flag</button>
        <button onClick={() => onToggleFlag(flagDetails.flagKey)}>Toggle Flag ON/OFF</button>
      </div>
      <div className='variants-container'>
        Variants:
        {Object.entries(flagDetails.variants).map((entry) => {
          return (
            <div className='variant-container'>
              <div className='variant'>{entry[0]}</div>
              <div className='value'>{String(entry[1])}</div>
            </div>
          )
        })}
      </div>

      {/* <p>{`Created at:
        ${new Date(flagDetails.createdAt).toLocaleTimeString()}
        ${new Date(flagDetails.createdAt).toLocaleDateString()}
        `}
      </p> */}

      {/* <p>default variant: {flagDetails.defaultVariant}</p> */}

      <NewRuleForm flag={flagDetails} contextKinds={[testUserEvaluationContext]}></NewRuleForm>
      <FlagDashboard flagKey={flagDetails.flagKey}></FlagDashboard>
    </div>
  );
}

export default FlagView;