import {z} from 'zod';

export const flagFormSchema = z.object({
  flagKey: z
    .string()
    .min(1, "Flag Key is required")
    .max(100, "Flag Key must be less than 100 characters")
    .trim(),
    
  flagType: z
    .enum(["boolean", "string", "number", "object"], {
      errorMap: () => ({ message: "You must select a valid flag type" })
    }),
    
  variants: z
    .array(
      z.object({
        key: z
          .string()
          .min(1, "Variant key is required")
          .trim(),
        value: z.union([
          z.string(),
          z.number(),
          z.boolean(),
          z.any() 
        ])
      })
    )
    .min(1, "At least one variant is required")
    .max(5, "Maximum 5 variants allowed")
    .refine(
      (variants) => {
        const keys = variants.map(v => v.key);
        const uniqueKeys = new Set(keys);
        return keys.length === uniqueKeys.size;
      },
      {
        message: "Variant keys must be unique",
        path: [0, "key"] 
      }
    )
    .superRefine((variants, ctx) => {
      const flagType = ctx.path.length > 0 ? 
        (ctx as any).root?.flagType : 
        undefined;
        
      variants.forEach((variant, index) => {
        if (flagType && flagType !== 'object') {
          const expectedType = flagType;
          let isValidType = false;
          
          switch (expectedType) {
            case 'string':
              isValidType = typeof variant.value === 'string';
              break;
            case 'number':
              isValidType = typeof variant.value === 'number' && !isNaN(variant.value);
              break;
            case 'boolean':
              isValidType = typeof variant.value === 'boolean';
              break;
          }
          
          if (!isValidType) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Variant value must be of type ${expectedType}`,
              path: [index, 'value']
            });
          }
        }
      });
    }),
    
  defaultVariant: z
    .string()
    .min(1, "Please select a default variant")
}).refine(
  (data) => {
    const variantKeys = data.variants.map(v => v.key);
    return variantKeys.includes(data.defaultVariant);
  },
  {
    message: "Default variant must match one of your variant keys",
    path: ["defaultVariant"]
  }
);