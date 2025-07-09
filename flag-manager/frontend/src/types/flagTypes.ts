import {z} from "zod";

export const FlagSchema = z.object({
  _id: z.string(),
  flagKey: z.string(), 
  enabled: z.boolean(),
  type: z.string(), // TODO: enforce that type is a valid flag type
  variants: z.object({}), //TODO: Add actual variants shape instead of {}
  createdAt: z.string(),
  updatedAt: z.string(), //TODO: allow null 
  defaultVariant: z.string()
});

export const FlagsSchema = z.array(FlagSchema);


export type Product = z.infer<typeof FlagSchema>;

export interface FlagFormDetails {
  // enabled: string;
  flagKey: string;
  flagType: string;
  variants: string;
  defaultVariant: string;
}

export type FlagDetails = FlagFormDetails & {
  createdAt: string
  updatedAt?: string
  isEnabled: boolean;
}

