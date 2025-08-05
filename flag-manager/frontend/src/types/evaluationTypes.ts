import { type FlagValue } from "./flagTypes";
import { z } from 'zod'
// import { type ErrorCode, type FlagMetadata } from "@openfeature/server-sdk";

export const ruleFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Rule name is required')
    .max(100, 'Rule name must be less than 100 characters')
    .trim(),

  attribute: z.enum(['id', 'role', 'group']),
  operator: z.enum(['=', '!=', '>', '<', '>=', '<=']),

  values: z
    .array(
      z.string()
      .min(1, 'At least one value is required')
      .max(100, 'Value must be less than 100 characters')
      .trim()
    ),

  flagKey: z.string(),
  flagType: z.string(),
  variant: z.string().min(1, 'Variant is required')
});

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

export type Operator = '=' | '!=' | '>' | '<' | '>=' | '<='

export interface EvaluationRuleInsertion {
  name: string
  attribute: string 
  operator: Operator
  values: Array<string>
  flagKey: string
  variant: string 
}

export interface EvaluationRule extends EvaluationRuleInsertion {
  id: string
}

export interface FlagResolution {
  value: FlagValue
  variant?: string
  reason?: string
  errorCode?: ErrorCode
  errorMessage?: string
  flagMetadata?: FlagMetadata
}

