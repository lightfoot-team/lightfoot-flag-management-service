import { type FlagValue } from "./flagTypes";
import { z } from 'zod'
// import { type ErrorCode, type FlagMetadata } from "@openfeature/server-sdk";

export const ruleFormSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  attribute: z.enum(['Everyone', 'id', 'role', 'group']),
  operator: z.enum(['=', '!=', '>', '<', '>=', '<=']),
  values: z.array(z.string().min(1).max(100).trim()).default([]),
  flagKey: z.string(),
  flagType: z.string(),
  variant: z.string().min(1),
  percentage: z.number().min(0).max(100).int(),
}).superRefine((data, ctx) => {
  if (data.attribute !== 'Everyone') {
    if (!data.values || data.values.length === 0) {
      ctx.addIssue({
        path: ['values'],
        code: z.ZodIssueCode.custom,
        message: 'At least one value is required',
      });
    } else {
      for (let i = 0; i < data.values.length; i++) {
        if (data.values[i].trim() === '') {
          ctx.addIssue({
            path: ['values', i],
            code: z.ZodIssueCode.custom,
            message: 'Value cannot be empty',
          });
        }
      }
    }
  }
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
  values?: Array<string>
  flagKey: string
  variant: string
  percentage: number
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

