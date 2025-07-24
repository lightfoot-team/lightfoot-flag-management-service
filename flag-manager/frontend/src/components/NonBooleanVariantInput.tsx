const NonBooleanFlagVariantInput = ({formState, setFormState}) => {
  return (
    <>
    {
      formState.flagType !== "boolean" && formState.variants.map((pair, index) => (
        <>
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
        </>
      ))
    }
  </>
  )
}

export default NonBooleanFlagVariantInput;