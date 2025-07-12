import { Request, Response, NextFunction } from 'express';
import DBPersistence from '../lib/dbPersistence';
import { create } from 'domain';
import type { FlagType } from '../types/flagTypes';
import type { AppError } from '../types/errorTypes';

const db = new DBPersistence();

// Create 
export const createFlag = async (req: Request, res: Response, next: NextFunction) => {
  const createdAt = "today"
  // const testFlag = {
  //   flagKey: "Test-Key",
  //   flagType: "string" as FlagType,
  //   variants: {"blue": "blue", "red":"red"},
  //   createdAt: createdAt,
  //   updatedAt: null,
  //   defaultVariant: "blue",
  //   isEnabled: false
  // }

  try {
    // await db.addFlag(testFlag);
    const result = await db.addFlag(req.body);
    const allFlags = await db.getAllFlags();

    res.status(201).send();
  } catch (err) {
    next(err);
  }
}

export const readAllFlags = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allFlags = await db.getAllFlags();
    res.status(200).json(allFlags);
    // res.json(allFlags);
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
    await db.toggleFlagEnabled(req.params.flagName);
    res.status(200).send();
  } catch (err) {
    next(err);
  }
}

export const editFlag = (req: Request, res: Response, next: NextFunction) => {

}

export const deleteFlag = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params.flagName);
    await db.deleteFlag(req.params.flagName);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
