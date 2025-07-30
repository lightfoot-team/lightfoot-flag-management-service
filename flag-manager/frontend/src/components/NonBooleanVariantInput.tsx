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
    <div className="space-y-6">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="flex flex-wrap gap-4 items-start border border-gray-200 rounded p-4 bg-gray-50"
        >
          <div className="flex-1 min-w-[200px]">
            <label htmlFor={`variant-${index}-key`} className="block font-medium text-gray-700 mb-1">Key</label>
            <input
              {...register(`variants.${index}.key`, validation.key)}
              id={`variant-${index}-key`}
              type="text"
              placeholder="Enter variant key"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[200px]">
            <label htmlFor={`index-${index}-value`} className="block font-medium text-gray-700 mb-1">Value</label>
            <input
              {...register(`variants.${index}.value`, validation.value)}
              id={`index-${index}-value`}
              type="text"
              placeholder={`Enter ${flagType} value`}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

          </div>
          <div className="flex items-end">
            <button
              type="button"
              onClick={() => removeVariant(index)}
              disabled={fields.length <= 1}
              className="mt-6 text-sm text-red-700 hover:underline disabled:opacity-50"
              aria-label={`Remove variant ${index + 1}`}
            >
              Remove Variant
            </button>
          </div>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={addVariant}
          disabled={fields.length >= 5}
          className="px-4 py-2 rounded-md text-base bg-blue-200 text-blue-1000 hover:bg-blue-300 transition disabled:opacity-50"
        >
          Add Variant {fields.length >= 5 && '(Max 5)'}
        </button>
      </div>
    </div>
  )
}

export default NonBooleanVariantInput;