import { Request, Response, NextFunction } from 'express';
import DBPersistence from '../lib/db-persistence';
const db = new DBPersistence();
import { type Flag } from '../types/flagTypes';

/**
 * Evaluates the value of a flag given its key and context
 * @param req 
 * @param res 
 * @param next 
 */
export const evaluateFlagWithContext = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const context = req.body.context;
    const flagKey = req.body.flagKey;
    console.log('context', context)
    console.log('fk', flagKey)
    const flag = await db.getFlagByKey(flagKey);
    console.log('flag', flag)
    /** TODO: replace with real flag evaluation using rules from manager */
    const flagEvaluation = (flag: Flag) => {
      const result = {
        variant: flag.defaultVariant, // TODO: Could be optional, confirm later
        value: flag.variants[flag.defaultVariant]
      }
      return result
    }

    console.log('response:', { data: flagEvaluation(flag as Flag) })
    res.status(200).json({ data: flagEvaluation(flag as Flag) })

  } catch (err) {
    next(err)
  }

}