import BooleanFlagVariantInput from "./BooleanVariantInput";
import NonBooleanVariantInput from "./NonBooleanVariantInput";

const EditVariantsForm = ({ variants, onSave, onCancel, flagDetails }) => {
  const flagType = flagDetails.flagType;
  
  return (
    <div>
      <p>Placeholder edit variants</p>
      {flagType === "boolean" && (
          <BooleanFlagVariantInput 
            register={register} 
            errors={errors}
            setValue={setValue}
          />
        )}
        {flagType !== "boolean" && (
          <NonBooleanVariantInput 
            fields={fields}
            append={append}
            remove={remove}
            register={register}
            errors={errors}
            flagType={flagType}
          />
        )}
      <div>
        <button onClick={onSave}>Save changes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default EditVariantsForm