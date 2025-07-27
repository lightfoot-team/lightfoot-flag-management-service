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
  // return (
  //   <div className='flag-list-item'>
  //     <h2>
  //       <Link to={`/flags/${flagDetails.flagKey}`}>
  //         {flagDetails.flagKey}  {flagDetails.isEnabled ? "ENABLED" : "DISABLED"}
  //       </Link>
  //       <button onClick={() => onToggleFlag(flagDetails.flagKey)}>
  //         {flagDetails.isEnabled ? "Disable" : "Enable"}
  //       </button>
  //       <button onClick={() => onDeleteFlag(flagDetails.flagKey)}>
  //         Delete
  //       </button>
  //     </h2>
  //     {/* <Link to={`/flags/${flagDetails.flagKey}`}>View/Edit</Link> */}
  //     {/* <p>Type: {flagDetails.flagType}</p> */}
  //     {/* {expanded && <FlagView flagDetails={flagDetails} onDeleteFlag={onDeleteFlag} onToggleFlag={onToggleFlag}></FlagView>} */}
  //   </div>
  // );
  return (
    <div className="flex justify-between items-center bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition mb-4">
      <Link
        to={`/flags/${flagDetails.flagKey}`}
        className="text-lg font-semibold text-gray-800 hover:underline"
      >
        {flagDetails.flagKey}{" "}
        <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${flagDetails.isEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {flagDetails.isEnabled ? "ENABLED" : "DISABLED"}
        </span>
      </Link>

      <div className="flex gap-2">
        <button
          onClick={() => onToggleFlag(flagDetails.flagKey)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition ${
            flagDetails.isEnabled
              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
              : "bg-green-100 text-green-800 hover:bg-green-200"
          }`}
        >
          {flagDetails.isEnabled ? "Disable" : "Enable"}
        </button>

        <button
          onClick={() => onDeleteFlag(flagDetails.flagKey)}
          className="px-3 py-1 rounded-md text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default FlagListItem;