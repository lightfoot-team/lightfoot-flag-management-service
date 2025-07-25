const RHFBooleanFlagVariantInput = ({ register, errors }) => {
  return (
    <div>
      <div>
        <label htmlFor="variant-true-key"></label>
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
        <label>True</label>
        <input 
          {...register("variants.0.value")}
          type="hidden"
          value="true"
        />
      </div>

      <div>
        <label htmlFor="variant-false-key"></label>
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
        <label>False</label>
        <input 
          {...register("variants.1.value")}
          type="hidden"
          value="false"
        />
      </div>
    </div>
  )
}

export default RHFBooleanFlagVariantInput;