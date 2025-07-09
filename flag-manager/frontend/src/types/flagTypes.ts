export interface FlagFormDetails {
  enabled: string;
  flagKey: string;
  flagType: string;
  variants: string;
  defaultVariant: string;
}

export type FlagDetails = FlagFormDetails & {
  createdAt: string
}