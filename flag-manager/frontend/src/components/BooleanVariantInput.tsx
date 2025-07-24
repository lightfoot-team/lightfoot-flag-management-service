import { useState } from "react";

// interface BooleanInputProps {
//   formState: object;
//   setFormState: () => void
// }

const BooleanFlagVariantInput = ({ formState, setFormState }) => {
  const [booleanVariants, setBooleanVariants] = useState([{key: '', value: true}, {key: '', value: false}]);

  return (
    <>
      <div key={0}>
        <input
          type="text"
          placeholder="Key"
          value={booleanVariants[0].key}
          onChange={(e) => {
            const newVariants = [...booleanVariants];
            newVariants[0].key = e.target.value;
            setBooleanVariants(newVariants);
            setFormState({ ...formState, variants: newVariants });
          }}
          required
        />
        <select>
          <option value="true">True</option>
        </select>
      </div>
      <div key={1}>
        <input
          type="text"
          placeholder="Key"
          value={booleanVariants[1].key}
          onChange={(e) => {
            const newVariants = [...booleanVariants];
            newVariants[1].key = e.target.value;
            setBooleanVariants(newVariants);
            setFormState({ ...formState, variants: newVariants });
          }}
          required
        />
        <select
          value="false"
          onChange={(e) => {
            const newVariants = [...formState.variants];
            newVariants[1].value = e.target.value;
            setFormState({ ...formState, variants: newVariants });
          }}
        >
          <option value="false">False</option>
        </select>
      </div>
    </>
  )
}

export default BooleanFlagVariantInput;