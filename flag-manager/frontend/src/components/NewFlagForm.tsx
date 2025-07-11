import { useForm } from "react-hook-form";
import { 
  type FlagFormDetails,
  type ParsedFlagFormDetails,
  type Variant,
 } from "../types/flagTypes";
import { addFlag } from "../services/flags";


const NewFlagForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FlagFormDetails>({
  });

  const onSubmit = async (data: FlagFormDetails) => {
    const variantKey = data.variantKey;
    const variantValue = data.variantValue;
    const variants: Variant = {}
    variants[variantKey] = variantValue;

    const parsedData: ParsedFlagFormDetails = {
      flagKey: data.flagKey,
      flagType: data.flagType,
      variants,
      defaultVariant: data.defaultVariant
    }

    await addFlag(parsedData);
  }
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>Flag Configuration</legend>

        <div>
          <label htmlFor="flag-name">Flag Name</label>
          <input
            id="flag-name"
            type="text"
            placeholder="Flag Name"
            {...register("flagKey", { required: true, maxLength: 150, minLength: 1 })}
          />
        </div>

        <div>
          <label htmlFor="flag-type">Flag Type</label>
          <select id="flag-type" {...register("flagType", { required: true })}>
            <option value="string">string</option>
            <option value="boolean">boolean</option>
            <option value="number">number</option>
            <option value="object">object</option>
          </select>
        </div>

        <div>
          <label htmlFor="variant-key">Variant Key</label>
          <input
            id="variant-key"
            type="text"
            placeholder="Variant Key"
            {...register("variantKey", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="variant-value">Variant Value</label>
          <input
            id="variant-value"
            type="text"
            placeholder="Variant Value"
            {...register("variantValue", { required: true })}
          />
        </div>

        <div>
          <label htmlFor="default-variant">Default</label>
          <input
            id="default-variant"
            type="text"
            placeholder="Default Variant"
            {...register("defaultVariant", { required: true })}
          />
        </div>

      </fieldset>

      {/* <fieldset>
        <legend>Enabled</legend>
        <div>
          <input
            type="radio"
            id="enabled-true"
            value="true"
            {...register("enabled")}
          />
          <label htmlFor="enabled-true">True</label>
        </div>
        <div>
          <input
            type="radio"
            id="enabled-false"
            value="false"
            {...register("enabled")}
          />
          <label htmlFor="enabled-false">False</label>
        </div>
      </fieldset> */}

      <div>
        <input type="submit" value="Submit" />
      </div>

    </form>
  )
}

export default NewFlagForm;