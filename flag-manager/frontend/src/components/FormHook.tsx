import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { 
  type FlagFormDetails,
  type ParsedFlagFormDetails,
  type Variant,
 } from "../types/flagTypes";
import { addFlag } from "../services/flags";
import RHFBooleanFlagVariantInput from "./RHFBooleanVariantInput";
import NonBooleanFlagVariantInput from './NonBooleanVariantInput';
import { useEffect } from "react";

const FormHook = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
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

          />
        )}
        {/*flagType !== "boolean" && <NonBooleanFlagVariantInput />}
        {/*}
        {flagType === "number" && <NumberFlagVariantInput />}
        {flagType === "string" && <StringFlagVariantInput />}
        {flagType === "object" && <ObjectFlagVariantInput />}
        */}
      </div>

      {/*
      <div>
        <label htmlFor="default-variant">Default Variant</label>
        <input
          id="default-variant"
          type="text"
          placeholder="Default Variant"
          value={formState.default}
          onChange={(e) =>
            setFormState({
              ...formState,
              default: e.target.value
            })
          }
          required
        />
      </div> */}

      <button type="submit">Create Flag</button>
    </form>
  );
};

export default FormHook;