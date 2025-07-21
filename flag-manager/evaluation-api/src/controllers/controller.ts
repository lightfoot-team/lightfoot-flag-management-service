import { Request, Response, NextFunction } from 'express';
import DBPersistence from '../lib/db-persistence';
const db = new DBPersistence();
import { type Flag } from '../types/flagTypes';
import { type EvaluationContext, type EvaluationRule, type Operator} from '../types/evaluationTypes';
import { getEvaluationFunction } from '../utils/operators';

/**
 * Checks whether the result of performing a comparison operation on the 
 * value of an attribute for the current evaluation context and a rule value produces a match 
 * @param contextValue the value of the attribute for the current evaluation context
 * @param operator the operation to perform on the values
 * @param ruleValue the value of the attribute for the current rule
 * @returns 
 */
const matchesRule = (contextValue: unknown, operator: Operator, ruleValue: unknown) => {
  const evaluate = getEvaluationFunction(operator)
  return evaluate(contextValue, ruleValue)
}


//TODO: account for multi-contexts
/**
 * Evaluates the the variant that a flag should resolve to for a specified evaluation context
 * @param evaluationContext the Context for which the flag is to be evaluated
 * @param flag the flag to evaluate
 * @returns the matching variant, falling back to default variant if no rule applies
 */
const evaluateFlagVariant = async (evaluationContext: EvaluationContext, flag: Flag) => {

  const evaluationRules: Array<EvaluationRule> = [] // TODO: add async db call to look up evaluation rules the contain flag.flagKey

  for (let i = 0; i < evaluationRules.length; i++) {
    const rule = evaluationRules[i];
    const attributeName = rule.attribute;
    const contextValue = evaluationContext[attributeName];
    for (let j = 0; j < rule.values.length; j++) {
      if (matchesRule(contextValue, rule.operator, rule.values[j])) {
        return rule.variant
      }
    }
  }
  return flag.defaultVariant;
}
/**
 * Evaluates the value of a flag given its key and context
 * @param req 
 * @param res 
 * @param next 
 */
export const getFlagEvaluation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const context = req.body.context;
    const flagKey = req.body.flagKey;

    const flag = await db.getFlagByKey(flagKey);

    const flagEvaluation = await evaluateFlagVariant(context, flag as Flag) //TODO; replace 'as' with zod parse

    console.log('response:', { data: flagEvaluation })
    res.status(200).json({ data: flagEvaluation })

  } catch (err) {
    next(err)
  }

}