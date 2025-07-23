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

const NewFlagForm = () => {
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
      if (formState.flagType === "boolean") {
        pair.value = pair.value === "true" ? true : false;
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
        
        {/* {formState.variants.map((pair, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Key"
              value={pair.key}
              onChange={(e) => {
                const newVariants = [...formState.variants];
                newVariants[index].key = e.target.value;
                setFormState({ ...formState, variants: newVariants });
              }}
              required
            />
            {formState.flagType === "boolean" && (
              <select value={pair.value || "true"} onChange={(e) => {
                const newVariants = [...formState.variants];
                newVariants[index].value = e.target.value;
                setFormState({...formState, variants: newVariants});
              }}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            )}

            {formState.flagType !== "boolean" && (
              <input
                type="text"
                placeholder="Value"
                value={pair.value}
                onChange={(e) => {
                  const newVariants = [...formState.variants];
                  newVariants[index].value = e.target.value;
                  setFormState({ ...formState, variants: newVariants });
                }}
                required
              />
            )}
            {formState.variants.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const newVariants = formState.variants.filter((_, i) => i !== index);
                  setFormState({ ...formState, variants: newVariants });
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))} */}
        <button
          type="button"
          onClick={() =>
            setFormState({
              ...formState,
              variants: [...formState.variants, { key: '', value: '' }]
            })
          }
        >
          + Add Variant
        </button>
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

export default NewFlagForm;

// const NewFlagForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FlagFormDetails>({
//   });

//   const onSubmit = async (data: FlagFormDetails) => {
//     const variantKey = data.variantKey;
//     const variantValue = data.variantValue;
//     const variants: Variant = {}
//     variants[variantKey] = variantValue;

//     const parsedData: ParsedFlagFormDetails = {
//       flagKey: data.flagKey,
//       flagType: data.flagType,
//       variants,
//       defaultVariant: data.defaultVariant
//     }

//     await addFlag(parsedData);
//   }
//   console.log(errors);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <fieldset>
//         <legend>Flag Configuration</legend>

//         <div>
//           <label htmlFor="flag-name">Flag Name</label>
//           <input
//             id="flag-name"
//             type="text"
//             placeholder="Flag Name"
//             {...register("flagKey", { required: true, maxLength: 150, minLength: 1 })}
//           />
//         </div>

//         <div>
//           <label htmlFor="flag-type">Flag Type</label>
//           <select id="flag-type" {...register("flagType", { required: true })}>
//             <option value="string">string</option>
//             <option value="boolean">boolean</option>
//             <option value="number">number</option>
//             <option value="object">object</option>
//           </select>
//         </div>

//         <div>
//           <label htmlFor="variant-key">Variant Key</label>
//           <input
//             id="variant-key"
//             type="text"
//             placeholder="Variant Key"
//             {...register("variantKey", { required: true })}
//           />
//         </div>

//         <div>
//           <label htmlFor="variant-value">Variant Value</label>
//           <input
//             id="variant-value"
//             type="text"
//             placeholder="Variant Value"
//             {...register("variantValue", { required: true })}
//           />
//         </div>

//         <div>
//           <label htmlFor="default-variant">Default</label>
//           <input
//             id="default-variant"
//             type="text"
//             placeholder="Default Variant"
//             {...register("defaultVariant", { required: true })}
//           />
//         </div>

//       </fieldset>

//       {/* <fieldset>
//         <legend>Enabled</legend>
//         <div>
//           <input
//             type="radio"
//             id="enabled-true"
//             value="true"
//             {...register("enabled")}
//           />
//           <label htmlFor="enabled-true">True</label>
//         </div>
//         <div>
//           <input
//             type="radio"
//             id="enabled-false"
//             value="false"
//             {...register("enabled")}
//           />
//           <label htmlFor="enabled-false">False</label>
//         </div>
//       </fieldset> */}

//       <div>
//         <input type="submit" value="Submit" />
//       </div>

//     </form>
//   )
// }
