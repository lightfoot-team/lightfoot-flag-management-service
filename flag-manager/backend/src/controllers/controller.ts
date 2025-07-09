import { Request, Response, NextFunction } from 'express';
import DBPersistence from '../lib/dbPersistence';
import { create } from 'domain';
import type { FlagType } from '../types/flagTypes';

const db = new DBPersistence();

// Create 
export const createFlag = async (req: Request, res: Response, next: NextFunction) => {
  console.log("We made it to create flag!");
  const createdAt = "today"
  const testFlag = {
    flagKey: "Test Key",
    flagType: "string" as FlagType,
    variants: {"blue": "blue", "red":"red"},
    createdAt: createdAt,
    updatedAt: null,
    defaultVariant: "blue",
    isEnabled: false
  }

  try {
    console.log("Arrived in TRY block");
    await db.addFlag(testFlag);
    console.log(testFlag);
    const allFlags = await db.getAllFlags();
    console.log(allFlags);
    res.json(testFlag);
  } catch (err) {
    console.log("Oh no!");
    console.log(err);
    next(err);
  }
}

export const readAllFlags = (req: Request, res: Response, next: NextFunction) => {
}

export const updateFlag = (req: Request, res: Response, next: NextFunction) => {
}

export const deleteFlag = (req: Request, res: Response, next: NextFunction) => {
}
