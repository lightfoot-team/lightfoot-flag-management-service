import { create } from 'domain';
import { createFlag, readAllFlags, readFlag, toggleFlag, deleteFlag } from '../../src/controllers/controller';
import DBPersistence from '../../src/lib/dbPersistence';
import { Request, Response, NextFunction } from 'express';
import { REPLCommand } from 'repl';
// TODOS:
// test all happy paths first, then write tests for errors (more specific than just 500),
//  then update backend files to send those specific status codes

  jest.mock('../../src/lib/dbPersistence');

  const mockFlag = {
        flagKey: 'test-key',
        flagType: 'string',
        variants: { blue: 'blue', red: 'red' },
        createdAt: 'today',
        updatedAt: null,
        defaultVariant: 'blue',
        isEnabled: false,
      };

test("This should call addFlag and respond with 201 status", async () => {
  const superMockAddFlag = jest.spyOn(DBPersistence.prototype, 'addFlag');

  let req = {body: mockFlag} as Request;
    let res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

  await createFlag(req as Request, res as Response, next);
  expect(superMockAddFlag).toHaveBeenCalled();  // createFlag calls the mock method
  expect(superMockAddFlag).toHaveBeenCalledWith(mockFlag); // createFlag calls the mock method with the appropriate argument
  expect(res.status).toHaveBeenCalledWith(201); // Expected status code returned from createFlag
});

// test for readAllFlags
describe('readAllFlags', () => {
  it('should call getAllFlags and respond with array of all flags (flags as objects)', async () => {
    let resultArr = [mockFlag];
    const superMockGetAllFlags = jest.spyOn(DBPersistence.prototype, 'getAllFlags').mockImplementation(async () => resultArr);

    let req = {body: mockFlag} as Request;
    let res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

    await readAllFlags(req as Request, res as Response, next);
    expect(superMockGetAllFlags).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(resultArr);
  });
});

// test for readFlag
describe('readFlag', () => {
  it('should call getFlagByKey with flagName and respond with the expected flag object', async () => {
    const superReadFlag = jest.spyOn(DBPersistence.prototype, 'getFlagByKey').mockImplementation(async () => mockFlag);

    let req = {params: {flagName: mockFlag.flagKey}} as Partial<Request>;
    let res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

    await readFlag(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(superReadFlag).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockFlag);
  });
});

// test for toggleFlag
describe('toggleFlag', () => {
  it('should call toggleFlagEnabled with flagName and respond with 200 status', async () => {
    const superToggleFlag = jest.spyOn(DBPersistence.prototype, 'toggleFlagEnabled');

    let req = {params: {flagName: mockFlag.flagKey}} as Partial<Request>;
    let res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

    await toggleFlag(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(superToggleFlag).toHaveBeenCalled();
  });
});

// test for deleteFlag
describe('deleteFlag', () => {
  it('should call deleteFlag with flagName and respond with 204 status', async () => {
    const superDeleteFlag = jest.spyOn(DBPersistence.prototype, 'deleteFlag');

    let req = {params: {flagName: mockFlag.flagKey}} as Partial<Request>;
    let res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

    await deleteFlag(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(superDeleteFlag).toHaveBeenCalled();
  });
});