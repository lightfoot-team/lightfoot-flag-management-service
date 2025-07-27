import { type FlagDetails } from "../types/flagTypes";
import { useState } from "react";
//import { type UserEvaluationContext } from "../types/evaluationTypes";
//import NewRuleForm from "./NewRuleForm";
import { Link } from "react-router-dom"
import FlagView from "./FlagView";
interface FlagListItemProps {
  flagDetails: FlagDetails;
  onDeleteFlag: (flagKey: string) => void;
  onToggleFlag: (flagKey: string) => void;
}

const FlagListItem: React.FC<FlagListItemProps> = ({ flagDetails, onDeleteFlag, onToggleFlag }) => {
  // const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div className='flag-list-item'>
      <h2>
        <Link to={`/flags/${flagDetails.flagKey}`}>
          {flagDetails.flagKey}  {flagDetails.isEnabled ? "ENABLED" : "DISABLED"}
        </Link>
        <button onClick={() => onToggleFlag(flagDetails.flagKey)}>
          {flagDetails.isEnabled ? "Disable" : "Enable"}
        </button>
        <button onClick={() => onDeleteFlag(flagDetails.flagKey)}>
          Delete
        </button>
      </h2>
      {/* <Link to={`/flags/${flagDetails.flagKey}`}>View/Edit</Link> */}
      {/* <p>Type: {flagDetails.flagType}</p> */}
      {/* {expanded && <FlagView flagDetails={flagDetails} onDeleteFlag={onDeleteFlag} onToggleFlag={onToggleFlag}></FlagView>} */}
    </div>
  );
}

export default FlagListItem;