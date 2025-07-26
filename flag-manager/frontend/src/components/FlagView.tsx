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
const FlagView:React.FC<FlagProps> = ({ flagDetails, onDeleteFlag, onToggleFlag }) => {

  return (
   <div>
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
      <div>
        <button onClick={() => onDeleteFlag(flagDetails.flagKey)}>Delete Feature</button>
        <button onClick={() => onToggleFlag(flagDetails.flagKey)}>Toggle Feature ON/OFF</button>
      </div>

      {/* <p>default variant: {flagDetails.defaultVariant}</p> */}

      <NewRuleForm flag={flagDetails} contextKinds={[testUserEvaluationContext]}></NewRuleForm>
    </div>
  );
}

export default FlagView;