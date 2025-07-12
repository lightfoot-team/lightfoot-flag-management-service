import { create } from 'domain';
import { createFlag, readAllFlags, readFlag, toggleFlag, deleteFlag } from '../../src/controllers/controller';
import DBPersistence from '../../src/lib/dbPersistence';
import { Request, Response, NextFunction } from 'express';
import { REPLCommand } from 'repl';
// TODOS:
// test all happy paths first, then write tests for errors (more specific than just 500),
//  then update backend files to send those specific status codes

  jest.mock('../../src/lib/dbPersistence');

  // const mockAddFlag = jest.fn();
  // const mockGetAllFlags = jest.fn().mockResolvedValue([]);

  const mockDbInstance = {
    addFlag: jest.fn(),
    getAllFlags: jest.fn(),
    getFlagByKey: jest.fn(),
    toggleFlagEnabled: jest.fn(),
    deleteFlag: jest.fn(),
  };
  // I think the issue is here - DB persistence methods aren't being called during the tests???
  const MockedDBPersistence = DBPersistence as jest.MockedClass<typeof DBPersistence>;
  MockedDBPersistence.mockImplementation(() => mockDbInstance as any);
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
  mockDbInstance.addFlag.mockResolvedValue(undefined);
  mockDbInstance.getAllFlags.mockResolvedValue([mockFlag]);
  // =======
  const superMockAddFlag = jest.spyOn(DBPersistence.prototype, 'addFlag');
  //======

  let req = {body: mockFlag} as Request;
    let res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

  await createFlag(req as Request, res as Response, next);
  // expect(mockDbInstance.addFlag).toHaveBeenCalledWith(mockFlag);
  expect(superMockAddFlag).toHaveBeenCalled();  // createFlag calls the mock method
  expect(superMockAddFlag).toHaveBeenCalledWith(mockFlag); // createFlag calls the mock method with the appropriate argument
  expect(res.status).toHaveBeenCalledWith(201); // Expected status code returned from createFlag
});

// // test for createFlag
// describe('createFlag', () => {
//   // Mock res, req, and next
//   const mockReq = { user: { id: '1' }} as Partial<Request>;
//   const mockRes = { status: (code: number) => {} } as Partial<Response>;
//   const mockNext: NextFunction = jest.fn() as NextFunction;
  
//   it('should call addFlag and respond with 201 status', async () => {
//     // Mock DBPersistence
//     const mockAddFlag = jest.fn().mockResolvedValue(undefined);
//     const mockGetAllFlags = jest.fn().mockResolvedValue([]);

//     (DBPersistence as jest.Mock).mockImplementation(() => {
//       addFlag: mockAddFlag;
//       getAllFlags:  mockGetAllFlags;
//     });

//     await createFlag(mockReq as Request, mockRes as Response, mockNext);
//     expect(mockRes.status).toHaveBeenCalledWith(201);
//   });
// });

// test for readAllFlags
describe('readAllFlags', () => {
  it('should call getAllFlags and respond with array of all flags (flags as objects)', async () => {
    let resultArr = [mockFlag];
    mockDbInstance.getAllFlags.mockResolvedValue(resultArr);

    let req = {body: mockFlag} as Request;
    let res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

    await readAllFlags(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
    // expect(res.json).toHaveBeenCalledWith(resultArr);
  });
});

// test for readFlag
describe('readFlag', () => {
  it('should call getFlagByKey with flagName and respond with the expected flag object', async () => {
    mockDbInstance.getFlagByKey.mockResolvedValue(mockFlag);

    let req = {params: {flagName: mockFlag.flagKey}} as Partial<Request>;
    let res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

    await readFlag(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// test for toggleFlag
describe('toggleFlag', () => {
  it('should call toggleFlagEnabled with flagName and respond with 200 status', async () => {
    mockDbInstance.toggleFlagEnabled.mockResolvedValue(true);

    let req = {params: {flagName: mockFlag.flagKey}} as Partial<Request>;
    let res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

    await toggleFlag(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// test for deleteFlag
describe('deleteFlag', () => {
  it('should call deleteFlag with flagName and respond with 204 status', async () => {
    mockDbInstance.deleteFlag.mockResolvedValue(true);

    let req = {params: {flagName: mockFlag.flagKey}} as Partial<Request>;
    let res = {
      status: jest.fn(),
      json: jest.fn(),
      send: jest.fn(),
    } as Partial<Response>;
    let next = jest.fn() as NextFunction;

    await deleteFlag(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(204);
  });
});