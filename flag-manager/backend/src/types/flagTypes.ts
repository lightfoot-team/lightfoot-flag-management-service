export type FlagType = 'boolean' | 'string' | 'number' | 'object';

type FlagValue = string | number | boolean | object

interface Variant {
  [key: string]: FlagValue;
}

export interface NewFlag {
  flagKey: string;
  flagType: FlagType;
  variants: Variant;
  createdAt: string;
  updatedAt: null | string;
  defaultVariant: string;
  isEnabled: boolean;
}

export interface Flag extends NewFlag {
  id: number;
}

