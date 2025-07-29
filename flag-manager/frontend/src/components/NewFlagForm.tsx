import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { flagFormSchema } from "../types/newFlagZodSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { addFlag } from "../services/flags";
import BooleanFlagVariantInput from "./BooleanVariantInput";
import NonBooleanVariantInput from "./NonBooleanVariantInput";
import type { FlagDetails } from "../types/flagTypes";

type FlagFormDetails = z.infer<typeof flagFormSchema>;

interface NewFlagFormProps {
  onClose: () => void;
  onAddFlag: (newFlag: FlagDetails) => void;
}

const NewFlagForm:React.FC<NewFlagFormProps> = ({ onClose, onAddFlag }) => {
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
      flagKey: '',
      flagType: 'boolean',
      variants: [
        {key: '', value: 'true'},
        {key: '', value: 'false'}
      ],
      defaultVariant: ''
    }
  })

  const flagType = watch("flagType");
  const variants = watch("variants") || [];
  const validOptions = variants.filter(variant => 
    variant?.key && variant.key.trim() !== ''
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  useEffect(() => {
    const getDefaultVariants = (flagType: string) => {
      switch (flagType) {
        case 'boolean':
          return [
            { key: '', value: "true" },
            { key: '', value: "false" }
          ];
        case 'string':
        case 'number':
        case 'object':
          return [{ key: '', value: '' }];
        default:
          return [{ key: '', value: '' }];
      }
    };

    setValue('variants', getDefaultVariants(flagType));
  }, [flagType, setValue]);

  const onSubmit = async (data) => {
    console.log(data);
    console.log("Validation passed!");
    try {
      await addFlag(data);
      onAddFlag(data)
      onClose();
    } catch (e) {
      console.error("Error submitting form, please try again", e)
    }
  }

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
        />
      </div>

      <div>
        <label htmlFor="flag-type" className="block font-medium text-gray-700 mb-1">Flag Type</label>
        <select
          id="flag-type"
          {...register("flagType")}
          className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="boolean">boolean</option>
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="object">object</option>
        </select>
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Variants</label>
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
        {/*}
        {flagType === "number" && <NumberFlagVariantInput />}
        {flagType === "string" && <StringFlagVariantInput />}
        {flagType === "object" && <ObjectFlagVariantInput />}
        */}
      </div>

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
          Create Flag
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-md text-base bg-red-100 text-red-800 hover:bg-red-200 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewFlagForm;