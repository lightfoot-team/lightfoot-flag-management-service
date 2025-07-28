import { useState } from "react";
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
  const [ isEditingVariants, setIsEditingVariants ] = useState(false);

  const handleToggleEditingVariants = () => {
    setIsEditingVariants(!isEditingVariants);
  }

  const handleSaveVariants = (newVariants) => {
    // Handle saving the variants
    console.log("Saving variants:", newVariants);
    setIsEditingVariants(false); // Hide edit form
  };

  const handleCancelEdit = () => {
    setIsEditingVariants(false); // Hide edit form without saving
  };

  return (
   <div>
      <h1>{flagDetails.flagKey}</h1>
      <h2>Flag Type: {flagDetails.flagType}</h2>
      <div>
        <button onClick={() => onDeleteFlag(flagDetails.flagKey)}>Delete Flag</button>
        <button onClick={() => onToggleFlag(flagDetails.flagKey)}>Toggle Flag ON/OFF</button>
      </div>
      {isEditingVariants ? (
        <EditVariantsForm
          variants={flagDetails.variants}
          onSave={handleSaveVariants}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
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
        <div>
          <button onClick={handleToggleEditingVariants}>Edit Variants</button>
        </div>
        </>
      )}

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