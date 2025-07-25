import { type FlagDetails } from "../types/flagTypes";
import { useState } from "react";
//import { type UserEvaluationContext } from "../types/evaluationTypes";
//import NewRuleForm from "./NewRuleForm";
interface FlagListItemProps {
  flagDetails: FlagDetails;
  onDeleteFlag: (flagKey: string) => void;
  onToggleFlag: (flagKey: string) => void;
}

const FlagListItem: React.FC<FlagListItemProps> = ({ flagDetails, onDeleteFlag, onToggleFlag }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div className='flag-list-item'>
      <h2 >{flagDetails.flagKey}  {flagDetails.isEnabled ? "ENABLED" : "DISABLED"}<span onClick={()=>setExpanded(!expanded)}> ▽</span></h2>
      
      {/* <p>Type: {flagDetails.flagType}</p> */}
      {expanded && <div>
      <div className='variants-container'>
        Variants:
        {Object.entries(flagDetails.variants).map((entry) => {
          return (
            <div className='variant-container'>
              <div className='variant'>{entry[0]}</div>
              <div className='value'>{entry[1]}</div>
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

      {/* <NewRuleForm flag={flagDetails} contextKinds={[testUserEvaluationContext]}></NewRuleForm> */}
    </div>}
    </div>
  );
}

export default FlagListItem;