// import { useForm } from "react-hook-form";
import { useState } from 'react';
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
  const navigate = useNavigate();
  
  const [formState, setFormState] = useState({
    flagKey: '',
    flagType: 'boolean',
    variants: [{ key: '', value: '' }],
    default: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const variantsObject: Variant = {};
    formState.variants.forEach(pair => {
      if (pair.key.trim() !== '') {
        variantsObject[pair.key] = pair.value;
      }

      if (formState.flagType === 'boolean') {
        if (pair.value === '') {
          variantsObject[pair.key] = 'true';
        }
      }
    });
    const parsedData: ParsedFlagFormDetails = {
      flagKey: formState.flagKey,
      flagType: formState.flagType,
      variants: variantsObject,
      defaultVariant: formState.default
    };

    await addFlag(parsedData);

    setFormState({
      flagKey: '',
      flagType: 'boolean',
      variants: [{ key: '', value: '' }],
      default: ''
    });

    navigate('/flags');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="flag-key">Flag Key</label>
        <input
          id="flag-key"
          type="text"
          placeholder="Flag Key"
          value={formState.flagKey}
          onChange={(e) =>
            setFormState({
              ...formState,
              flagKey: e.target.value
            })
          }
          required
        />
      </div>

      <div>
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
      </div>

      <button type="submit">Create Flag</button>
    </form>
  );
};

export default FormHook;