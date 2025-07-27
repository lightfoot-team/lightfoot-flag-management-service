import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";
import { flagFormSchema } from "../types/zodSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  type ParsedFlagFormDetails,
  type Variant,
 } from "../types/flagTypes";
import { addFlag } from "../services/flags";
import RHFBooleanFlagVariantInput from "./RHFBooleanVariantInput";
import RHFNonBooleanVariantInput from "./RHFNonBooleanVariantInput";
import Flag from "./Flag";

type FlagFormDetails = z.infer<typeof flagFormSchema>;

const FormHook = () => {
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

  const navigate = useNavigate();
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

  const onSubmit = (data) => {
    console.log(data);
    console.log("Validation passed!");
    // navigate('/flags');
  }

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="flag-key">Flag Key</label>
        <input 
          {...register("flagKey")}
          type="text"
          id="flag-key"
          placeholder="Flag Key"
        />
      </div>

      <div>
        <label htmlFor="flag-type">Flag Type</label>
        <select
          id="flag-type"
          {...register("flagType")}
        >
          <option value="boolean">boolean</option>
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="object">object</option>
        </select>
      </div>

      <div>
        <label>Variants</label>
        {flagType === "boolean" && (
          <RHFBooleanFlagVariantInput 
            register={register} 
            errors={errors}
            setValue={setValue}
          />
        )}
        {flagType !== "boolean" && (
          <RHFNonBooleanVariantInput 
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

      <button type="submit">Create Flag</button>
    </form>
  );
};

export default FormHook;