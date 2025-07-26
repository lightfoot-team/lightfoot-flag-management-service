import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import { 
  type FlagFormDetails,
  type ParsedFlagFormDetails,
  type Variant,
 } from "../types/flagTypes";
import { addFlag } from "../services/flags";
import { useFieldArray } from "react-hook-form";
import RHFBooleanFlagVariantInput from "./RHFBooleanVariantInput";
import RHFNonBooleanVariantInput from "./RHFNonBooleanVariantInput";
import { useEffect } from "react";

const FormHook = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control
  } = useForm<FlagFormDetails>({
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
    rules: {
      required: "At least one variant is required.",
      minLength: {
        value: 1,
        message: "At least one variant is required."
      },
      maxLength: {
        value: 5,
        message: "Maximum 5 variants allowed."
      }
    }
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
    // navigate('/flags');
  }

  console.log("errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="flag-key">Flag Key</label>
        <input 
          {...register("flagKey", {
            required: {
              value: true,
              message: "Flag Key is required"
            },
            minLength: {
              value: 1,
              message: "Flag Key must be at least 1 character long."
            },
            maxLength: {
              value: 100,
              message: "Flag Key must be less than 100 characters."
            }
          })
          }
          type="text"
          id="flag-key"
          placeholder="Flag Key"
        />
      </div>

      <div>
        <label htmlFor="flag-type">Flag Type</label>
        <select
          id="flag-type"
          {...register("flagType", {
            required: {
              value: true,
              message: "You must select a flag type."
            }
          }

          )}
          required
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
          {...register("defaultVariant", {
            required: validOptions.length > 0 ? "Please select a default variant" : "Add variants first",
            validate: (value) => {
              if (!value) return true;
              const variantKeys = validOptions.map(v => v.key);
              return variantKeys.includes(value) || "Default variant must match an existing variant key"
            }
          })}
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