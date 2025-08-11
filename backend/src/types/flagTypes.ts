export interface FlagFormVariant {
  key: string,
  value: string
}

export type FlagType = 'boolean' | 'string' | 'number' | 'object';

export type FlagValue = string | number | boolean | object

export interface Variant {
  [key: string]: FlagValue;
}

export interface NewFlag {
  flagKey: string;
  flagType: FlagType;
  variants: Variant;
  createdAt: string;
  updatedAt?: null | string;
  defaultVariant: string;
  isEnabled: boolean;
}

export interface Flag extends NewFlag {
  id: number;
}