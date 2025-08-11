import {z} from "zod";

export const FlagSchema = z.object({
  _id: z.string(),
  flagKey: z.string(), 
  enabled: z.boolean(),
  type: z.string(),
  variants: z.object({}),
  createdAt: z.string(),
  updatedAt: z.string(),
  defaultVariant: z.string()
});

export const FlagsSchema = z.array(FlagSchema);

export type FlagValue = string | number | boolean | object

export interface Variant {
  [key: string]: FlagValue;
}

export type Flag = z.infer<typeof FlagSchema>;

export interface FlagFormDetails {
  flagKey: string;
  flagType: string;
  variants: Variant[];
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
