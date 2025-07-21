import { getFlagEvaluation, evaluateFlagVariant } from '../../src/controllers/controller';
import DBPersistence from '../../src/lib/db-persistence';
import { Request, Response, NextFunction } from 'express';
import { type EvaluationRule, type EvaluationContext, type UserEvaluationContext } from '../../src/types/evaluationTypes';
import { type Flag } from '../../src/types/flagTypes';

jest.mock('../../src/lib/db-persistence');

const mockFlag: Flag = {
  id: 1,
  flagKey: 'test-key',
  flagType: 'string',
  variants: { blue: 'blue', red: 'red' },
  createdAt: 'today',
  updatedAt: null,
  defaultVariant: 'blue',
  isEnabled: false,
};
const mockUserContext: UserEvaluationContext = {
  kind: 'user',
  targetingKey: 'testUserKey1',
  email: 'user@example.com'
}

const mockRuleEmailEquals: EvaluationRule = {
  contextKind: 'user',
  attribute: 'email',
  operator: 'equals',
  values: ['user@example.com'],
  flagKey: 'test-key',
  variant: 'red'
}

let res: Partial<Response>;
let next: NextFunction;

beforeEach(() => {
  res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn(),
  } as Partial<Response>;
  next = jest.fn() as NextFunction;
})

describe('evaluateFlagVariant',() => {
  it('should return the correct value for a flag given a matching rule and context', async  () => {
    let resultArr = [mockRuleEmailEquals];
    const mockGetRules = jest.spyOn(DBPersistence.prototype, 'getMatchingRules').mockImplementation(async (flagKey) => resultArr);
    
    const result = await evaluateFlagVariant(mockUserContext, mockFlag);
    expect(result).toBe('red');
  })


  it('should fall back to the default if no matching rule is found', async  () => {
    let resultArr: Array<EvaluationRule> = [];
    const mockGetRules = jest.spyOn(DBPersistence.prototype, 'getMatchingRules').mockImplementation(async (flagKey) => resultArr);
    
    const result = await evaluateFlagVariant(mockUserContext, mockFlag);
    expect(result).toBe('blue');
  })
})
