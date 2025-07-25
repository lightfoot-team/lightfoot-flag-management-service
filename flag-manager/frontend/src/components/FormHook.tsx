import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { 
  // type FlagFormDetails,
  type ParsedFlagFormDetails,
  type Variant,
 } from "../types/flagTypes";
import { addFlag } from "../services/flags";
import BooleanFlagVariantInput from './BooleanVariantInput';
import NonBooleanFlagVariantInput from './NonBooleanVariantInput';

const FormHook = () => {
  const { 
    register,
    handleSubmit,
    formState: { errors } 
  } = useForm({
    defaultValues: {
      flagKey: '',
      flagType: 'boolean',
      variants: [{key: '', value: ''}],
      default: ''
    }
  })

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="flag-key">Flag Key</label>
        <input 
          {...register("flagKey", {required: true}) }
          type="text"
          id="flag-key"
          placeholder="Flag Key"
        />
      </div>

      {/* <div>
        <label htmlFor="flag-type">Flag Type</label>
        <select
          id="flag-type"
          value={formState.flagType}
          onChange={(e) =>
            setFormState({
              ...formState,
              flagType: e.target.value
            })
          }
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
        {formState.flagType === "boolean" && (
          <BooleanFlagVariantInput formState={formState} setFormState={setFormState} />
        )}
        {formState.flagType !== "boolean" && (
          <NonBooleanFlagVariantInput formState={formState} setFormState={setFormState} />
        )}
      </div>

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