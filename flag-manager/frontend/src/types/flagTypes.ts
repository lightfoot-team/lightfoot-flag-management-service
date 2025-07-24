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

type FlagValue = string | number | boolean | object

export interface Variant {
  [key: string]: FlagValue;
}

export type Product = z.infer<typeof FlagSchema>;

export interface FlagFormDetails {
  flagKey: string;
  flagType: string;
  variantKey: string;
  variantValue: string;
  defaultVariant: string;
}

export interface ParsedFlagFormDetails {
  flagKey: string;
  flagType: string;
  variants: object;
  defaultVariant: string;
}

export type FlagDetails = ParsedFlagFormDetails & {
  createdAt: string
  updatedAt?: string
  isEnabled: boolean;
}
