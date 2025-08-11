import { useEffect } from "react";
import type { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { z } from 'zod';
import { flagFormSchema } from "../types/newFlagZodSchema";

type FlagFormDetails = z.infer<typeof flagFormSchema>;

interface BooleanFlagVariantInputProps {
  register: UseFormRegister<FlagFormDetails>;
  setValue: UseFormSetValue<FlagFormDetails>;
}

const BooleanFlagVariantInput:React.FC<BooleanFlagVariantInputProps> = ({ register, setValue }) => {

  useEffect(() => {
    setValue("variants.0.value", "true");
    setValue("variants.1.value", "false");
  }, []); 

  return (
    <div className="flex flex-wrap gap-4">
      {/* True Variant */}
      <div className="flex flex-col flex-1">
        <label htmlFor="variant-true-key">Key</label>
        <input
          {...register("variants.0.key", {
            required: {
              value: true,
              message: "True variant key is required",
            },
            minLength: {
              value: 1,
              message: "True variant key must be at least 1 character long.",
            },
            maxLength: {
              value: 50,
              message: "True variant key must be fewer than 50 characters long.",
            },
          })}
          id="variant-true-key"
          type="text"
          placeholder="Key for true value"
          className="border rounded p-2"
        />
        <input
          {...register("variants.0.value")}
          type="text"
          readOnly
          className="border rounded p-2 mt-1 bg-gray-100"
        />
      </div>

      {/* False Variant */}
      <div className="flex flex-col flex-1">
        <label htmlFor="variant-false-key">Key</label>
        <input
          {...register("variants.1.key", {
            required: {
              value: true,
              message: "False variant key is required",
            },
            minLength: {
              value: 1,
              message: "False variant key must be at least 1 character long.",
            },
            maxLength: {
              value: 50,
              message: "False variant key must be fewer than 50 characters long.",
            },
          })}
          id="variant-false-key"
          type="text"
          placeholder="Key for false value"
          className="border rounded p-2"
        />
        <input
          {...register("variants.1.value")}
          type="text"
          readOnly
          className="border rounded p-2 mt-1 bg-gray-100"
        />
      </div>
    </div>
  );
};

export default BooleanFlagVariantInput;