import { Request, Response, NextFunction } from 'express';
import DBPersistence from '../lib/dbPersistence';
import type { 
  FlagType, 
  NewFlag,
  FlagValue,
  Variant,
  FlagFormVariant
} from '../types/flagTypes';
import type { AppError } from '../types/errorTypes';
import { EvaluationRule } from '../types/evaluationTypes';
import { z } from 'zod';
import { flagFormSchema } from '../types/newFlagZodSchema';

type FlagFormDetails = z.infer<typeof flagFormSchema>

const db = new DBPersistence();

const convertVariantValue = (value: string, flagType: FlagType): FlagValue => {
  switch (flagType) {
    case 'string':
      return value;
    case 'number':
      return Number(value);
    case 'boolean':
      return value === 'true';
    case 'object':
      return value;
    default:
      return value;
  }
}

const convertVariants = (variantsArray: FlagFormVariant[], flagType: FlagType) => {
  const variants: Variant = {};
  variantsArray.forEach(variant => {
    const key: string = variant.key;
    const value: string = variant.value;

    variants[key] = convertVariantValue(value, flagType);
  });

  return variants;
}
const parseFlagFormDetails = (flagFormDetails: FlagFormDetails): NewFlag => {
  const { flagKey, flagType, defaultVariant, variants: variantsArray } = flagFormDetails;
  const createdAt = new Date(Date.now()).toUTCString();
  const variants = convertVariants(variantsArray as FlagFormVariant[], flagType);

  const parsedFlagFormDetails = {
    flagKey,
    flagType,
    variants,
    createdAt,
    defaultVariant,
    isEnabled: false
  };

  return parsedFlagFormDetails;
}

// Create 
export const createFlag = async (req: Request, res: Response, next: NextFunction) => {
  const flagFormDetails = req.body;
  const validationResult = flagFormSchema.safeParse(flagFormDetails);

  if (validationResult.success) {
    console.log("Flag form data successfully validated.")
  } else {
    console.error("Validation errors: ", validationResult.error.errors);
    res.status(422).send();
  }

  try {
    const parsedFlagFormDetails: NewFlag = parseFlagFormDetails(flagFormDetails);
    const result = await db.addFlag(parsedFlagFormDetails);
    // const allFlags = await db.getAllFlags();
    res.status(201).send();
  } catch (err) {
    next(err);
  }
}

export const readAllFlags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allFlags = await db.getAllFlags();
    res.status(200).json(allFlags);
  } catch (err) {
    next(err);
  }
}

export const readFlag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flagName = req.params.flagName;
    if (typeof flagName !== 'string' || flagName.length === 0) {
      const err: AppError = new Error('Flag key must be a non-empty string');
      err.status = 400;
      throw err;
    }
    const flag = await db.getFlagByKey(flagName);
    res.status(200).json(flag);
  } catch (err) {
    next(err);
  }
}

export const toggleFlag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flagName = req.params.flagName;
    if (typeof flagName !== 'string' || flagName.length === 0) {
      const err: AppError = new Error('Flag key must be a non-empty string');
      err.status = 400;
      throw err;
    }
    await db.toggleFlagEnabled(flagName);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}

//TODO: implement
export const updateFlag = async (req: Request, res: Response, next: NextFunction) => {
  const flagFormDetails = req.body;
  const validationResult = flagFormSchema.safeParse(flagFormDetails);

  if (validationResult.success) {
    console.log("Flag form data successfully validated.")
  } else {
    console.error("Validation errors: ", validationResult.error.errors);
    res.status(422).send();
  }

  try {
    const parsedFlagFormDetails: NewFlag = parseFlagFormDetails(flagFormDetails);
    const result = await db.updateFlag(parsedFlagFormDetails);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
}

export const deleteFlag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const flagName = req.params.flagName;
    if (typeof flagName !== 'string' || flagName.length === 0) {
      const err: AppError = new Error('Flag key must be a non-empty string');
      err.status = 400;
      throw err;
    }
    await db.deleteFlag(flagName);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

export const createRule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rule: EvaluationRule = req.body.rule;
    console.log('Rule:', rule);
    const {name, values} = rule;
    const addRuleResult = await db.addRule(rule);
    const addRuleValuesResult = await db.addRuleValues(name, values);
    res.status(201).send();
  } catch (err) {
    next(err);
  }
}