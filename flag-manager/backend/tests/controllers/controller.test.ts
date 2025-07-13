import { createFlag, readAllFlags, readFlag, toggleFlag, deleteFlag } from '../../src/controllers/controller';
import DBPersistence from '../../src/lib/dbPersistence';
import { Request, Response, NextFunction } from 'express';

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

test("This should call addFlag and respond with 201 status", async () => {
  const mockAddFlag = jest.spyOn(DBPersistence.prototype, 'addFlag');

  let req = { body: mockFlag } as Request;

  await createFlag(req as Request, res as Response, next);
  expect(mockAddFlag).toHaveBeenCalled();  // createFlag calls the mock method
  expect(mockAddFlag).toHaveBeenCalledWith(mockFlag); // createFlag calls the mock method with the appropriate argument
  expect(res.status).toHaveBeenCalledWith(201); // Expected status code returned from createFlag
});



describe('readAllFlags', () => {
  it('should call getAllFlags and respond with array of all flags (flags as objects)', async () => {
    let resultArr = [mockFlag];
    const mockGetAllFlags = jest.spyOn(DBPersistence.prototype, 'getAllFlags').mockImplementation(async () => resultArr);

    let req = { body: mockFlag } as Request;

    await readAllFlags(req as Request, res as Response, next);
    expect(mockGetAllFlags).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(resultArr);
  });
});

describe('readFlag', () => {
  it('should call getFlagByKey with flagName and respond with the expected flag object', async () => {
    const mockReadFlag = jest.spyOn(DBPersistence.prototype, 'getFlagByKey').mockImplementation(async () => mockFlag);

    let req = { params: { flagName: mockFlag.flagKey } } as Partial<Request>;

    await readFlag(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockReadFlag).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockFlag);
  });

  it('should throw an error if the flagName is empty or not a string', async () => {
    jest.spyOn(DBPersistence.prototype, 'getFlagByKey').mockImplementation(async () => mockFlag);
    let req = { params: { flagName: '' } } as Partial<Request>;
    await readFlag(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Flag key must be a non-empty string',
      status: 400
    }));
  })
});

describe('toggleFlag', () => {
  it('should call toggleFlagEnabled with flagName and respond with 200 status', async () => {
    const mockToggleFlag = jest.spyOn(DBPersistence.prototype, 'toggleFlagEnabled');

    let req = { params: { flagName: mockFlag.flagKey } } as Partial<Request>;

    await toggleFlag(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockToggleFlag).toHaveBeenCalled();
  });
  it('should throw an error if the flagName is empty or not a string', async () => {
    jest.spyOn(DBPersistence.prototype, 'toggleFlagEnabled').mockImplementation(async () => mockFlag);
    let req = { params: { flagName: '' } } as Partial<Request>;
    await toggleFlag(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Flag key must be a non-empty string',
      status: 400
    }));
  })
});

// test for deleteFlag
describe('deleteFlag', () => {
  it('should call deleteFlag with flagName and respond with 204 status', async () => {
    const mockDeleteFlag = jest.spyOn(DBPersistence.prototype, 'deleteFlag');

    let req = { params: { flagName: mockFlag.flagKey } } as Partial<Request>;

    await deleteFlag(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(204);
    expect(mockDeleteFlag).toHaveBeenCalled();
  });
  it('should throw an error if the flagName is empty or not a string', async () => {
    jest.spyOn(DBPersistence.prototype, 'deleteFlag').mockImplementation(async () => mockFlag);
    let req = { params: { flagName: '' } } as Partial<Request>;
    await deleteFlag(req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      message: 'Flag key must be a non-empty string',
      status: 400
    }));
  })
});