
const NonBooleanVariantInput = ({ 
  register,
  errors,
  flagType,
  fields,
  append,
  remove
}) => {

  const addVariant = () => {
    if (fields.length < 5) {
      append({ key: '', value: '' });
    }
  };

  const removeVariant = (index) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const useVariantValidation = () => {
  return {
    key: {
      required: "Variant key is required",
      validate: {
        unique: (value, formValues) => {
          const keys = formValues.variants?.map(v => v.key) || [];
          const duplicates = keys.filter(key => key === value);
          return duplicates.length <= 1 || "Variant keys must be unique";
        },
        notEmpty: (value) => value.trim() !== '' || "Key cannot be empty"
      }
    },
    value: {
      required: "Variant value is required",
      validate: {
        notEmpty: (value) => value.trim() !== '' || "Value cannot be empty"
      }
    }
  };
};

  const validation = useVariantValidation();

  return (
    <div className="variants-container">
      <div className="variants-header">

        {fields.map((field, index) => (
          <div key={field.id} className="variant-row">
            <div className="variant-inputs">
              <label htmlFor={`variant-${index}-key`}>Key</label>
              <input
                {...register(`variants.${index}.key`, validation.key)}
                id={`variant-${index}-key`}
                type="text"
                placeholder="Enter variant key"
              />

              <label htmlFor={`index-${index}-value`}>Value</label>
              <input
                {...register(`variants.${index}.value`, validation.value)}
                id={`index-${index}-value`}
                type="text"
                placeholder={`Enter ${flagType} value`}
              />

            </div>

            <button
              type="button"
              onClick={() => removeVariant(index)}
              disabled={fields.length <= 1}
              className="remove-variant-button"
              aria-label={`Remove variant ${index + 1}`}
            >
              Remove Variant
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addVariant}
          disabled={fields.length >= 5}
          className="add-variant-button"
        >
          Add Variant {fields.length >= 5 && '(Max 5)'}
        </button>
      </div>
    </div>
  )
}

export default NonBooleanVariantInput;