import { useState } from "react";

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








      {/* {
        // Remove select option
        // Create two divs - one for the true variant, one for the false variant
        // Label one as true and the other as false
        // Handle how to add the variant key and true/false values to the formstate
        formState.variants.map((pair, index) => {
          return (
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
              <select
                value={pair.value || "true"}
                onChange={(e) => {
                  const newVariants = [...formState.variants];
                  newVariants[index].value = e.target.value;
                  setFormState({ ...formState, variants: newVariants });
                }}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
          )
        })
      } */}
    </>
  )
}

export default BooleanFlagVariantInput;