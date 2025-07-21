import { Request, Response, NextFunction } from 'express';
import DBPersistence from '../lib/dbPersistence';
import { create } from 'domain';
import type { FlagType } from '../types/flagTypes';
import type { AppError } from '../types/errorTypes';

const db = new DBPersistence();

// Create 
export const createFlag = async (req: Request, res: Response, next: NextFunction) => {
  const createdAt = "today"

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

export const editFlag = (req: Request, res: Response, next: NextFunction) => {

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
