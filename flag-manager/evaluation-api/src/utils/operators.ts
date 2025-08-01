import { type Operator } from "../types/evaluationTypes";

//TODO: add remaining operators
/**
 * Returns a function that takes in two values and compares them 
 * according to the specified operator
 * @param operator the name of the operator
 * @returns an evaluation function for the specified operator
 */
export const getEvaluationFunction = (operator: Operator) => {
  switch (operator) {
    case '=':
      return (a: unknown, b: unknown) => a === b;
    case '!=':
      return (a: unknown, b: unknown) => a !== b;

    default:
      throw new Error('Invalid operator') //TODO: check best practice here 
  }
}