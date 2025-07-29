import { type FlagValue } from "./flagTypes";
import { z } from 'zod'
// import { type ErrorCode, type FlagMetadata } from "@openfeature/server-sdk";

export const ruleFormSchema = z.object({
  // TODO: zod schema for rule form
  name: z
    .string()
    .min(1, "A name for the rule is required.")
    .max(100, "Rule name must be less than 100 characters")
})

export interface EvaluationContext {
  targetingKey: string, // unique identifier for subject (ie UUID or hash of username)
  kind: string
  [attributes: string]: unknown
}

export interface UserEvaluationContext extends EvaluationContext {
  kind: "user"
  name?: string
  email?: string
  location?: string
  [attributes: string]: unknown
}

export type Operator =
  'equals' | 'notEquals' | 'endsWith' | 'startsWith' |
  'matches' | 'contains' | 'lessThan' | 'greaterThan' |
  'lessThanEquals' | 'greaterThanEquals';

export interface EvaluationRule {
  name: string
  contextKind: string
  attribute: string 
  operator: Operator
  values: Array<string>
  flagKey: string
  variant: string 
}

export interface FlagResolution {
  value: FlagValue
  variant?: string
  reason?: string
  errorCode?: ErrorCode
  errorMessage?: string
  flagMetadata?: FlagMetadata
}

