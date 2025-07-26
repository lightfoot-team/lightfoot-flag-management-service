import { useEffect } from "react";

const RHFBooleanFlagVariantInput = ({ register, errors, setValue }) => {

  useEffect(() => {
    setValue("variants.0.value", "true");
    setValue("variants.1.value", "false");
  }, []); 

  return (
    <div>
      <div>
        <label htmlFor="variant-true-key">Key</label>
        <input
          {...register("variants.0.key", {
            required: {
              value: true,
              message: "True variant key is required"
            },
            minLength: {
              value: 1,
              message: "True variant key must be at least 1 character long."
            },
            maxLength: {
              value: 50,
              message: "True variant key must be fewer than 50 characters long."
            }
          })
          }
          id="variant-true-key"
          type="text"
          placeholder="Key for true value"
        />
        <input 
          {...register("variants.0.value")}
          type="text"
          readOnly
        />
      </div>

      <div>
        <label htmlFor="variant-false-key">Key</label>
        <input
          {...register("variants.1.key", {
            required: {
              value: true,
              message: "False variant key is required"
            },
            minLength: {
              value: 1,
              message: "False variant key must be at least 1 character long."
            },
            maxLength: {
              value: 50,
              message: "False variant key must be fewer than 50 characters long."
            }
          })
          }
          id="variant-false-key"
          type="text"
          placeholder="Key for false value"
        />
        <input 
          {...register("variants.1.value")}
          type="text"
          readOnly
        />
      </div>
    </div>
  )
}

export default RHFBooleanFlagVariantInput;