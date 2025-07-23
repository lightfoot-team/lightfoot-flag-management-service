const BooleanFlagVariantInput = ({ formState, setFormState }) => {
  return (
    <>
      {
        formState.variants.map((pair, index) => {
          if (pair.value === '') {
            const newVariants = [...formState.variants];
            newVariants[index].value = 'true';
            setFormState({ ...formState, variants: newVariants });
          }

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
      }
    </>
  )
}

export default BooleanFlagVariantInput;