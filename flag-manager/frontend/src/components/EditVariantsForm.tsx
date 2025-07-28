import { z } from 'zod';
import { 
  useForm,
  useFieldArray
} from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { flagFormSchema } from '../types/newFlagZodSchema';
import BooleanFlagVariantInput from "./BooleanVariantInput";
import NonBooleanVariantInput from "./NonBooleanVariantInput";
import { variantsToArray } from "../services/forms";
import { updateFlag } from '../services/flags';

type FlagFormDetails = z.infer<typeof flagFormSchema>;

const EditVariantsForm = ({ onCancel, flagDetails, onToggle }) => {
  const flagType = flagDetails.flagType;
  const formVariants = variantsToArray(flagDetails.variants);

  const { 
      register,
      handleSubmit,
      formState: { errors },
      watch,
      setValue,
      control
    } = useForm<FlagFormDetails>({
      resolver: zodResolver(flagFormSchema),
      defaultValues: {
        flagKey: flagDetails.flagKey,
        flagType,
        variants: formVariants,
        defaultVariant: flagDetails.defaultVariant
      }
    })

    const onSubmit = async (data) => {
      console.log("Validation passed!")
      console.log(data);
      try {
        await updateFlag(data);
        // onToggle();
      } catch (e) {
        console.error("Error submitting form, please try again", e)
      }
    }

  const variants = watch("variants") || [];
  const validOptions = variants.filter(variant => 
    variant?.key && variant.key.trim() !== ''
  );

  const { fields, append, remove } = useFieldArray({
      control,
      name: "variants",
  });
  
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
        <label htmlFor="default-variant">Default Variant</label>
        <select
          {...register("defaultVariant")}
          id="default-variant"
          disabled={validOptions.length <= 0}
        >
          <option value="">
            {validOptions.length > 0 ? "Select a default variant" : "No variants available"}
          </option>
          {validOptions.map((variant, index) => (
            <option key={`${variant.key}-${index}`} value={variant.key}>
              {variant.key}: {variant.value && `${variant.value}`}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button onClick={handleSubmit(onSubmit)}>Save changes</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}

export default EditVariantsForm