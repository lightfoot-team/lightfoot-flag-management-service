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
import type { FlagDetails } from '../types/flagTypes';

type FlagFormDetails = z.infer<typeof flagFormSchema>;

interface EditVariantsFormProps {
  onClose: () => void;
  flagDetails: FlagDetails;
}

const EditVariantsForm:React.FC<EditVariantsFormProps> = ({ onClose, flagDetails }) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 space-y-6"
    >
    <div>
        <label htmlFor="flag-key" className="block font-medium text-gray-700 mb-1">Flag Key</label>
        <input 
          {...register("flagKey")}
          type="text"
          id="flag-key"
          placeholder="Flag Key"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        />
      </div>

      <div>
        <label htmlFor="flag-type" className="block font-medium text-gray-700 mb-1">Flag Type</label>
        <select
          id="flag-type"
          {...register("flagType")}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled
        >
          <option value="boolean">boolean</option>
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="object">object</option>
        </select>
      </div>

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
        <label htmlFor="default-variant" className="block font-medium text-gray-700 mb-1">Default Variant</label>
        <select
          {...register("defaultVariant")}
          id="default-variant"
          disabled={validOptions.length <= 0}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-white disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="flex justify-start space-x-4 mt-6">
        <button
          type="submit"
          className="px-4 py-2 rounded-md text-base bg-blue-200 text-blue-1000 hover:bg-blue-300 transition"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md text-base bg-red-100 text-red-800 hover:bg-red-200 transition"
        >
          Cancel
        </button>
      </div>

    </div>
    </form>
  )
}

export default EditVariantsForm