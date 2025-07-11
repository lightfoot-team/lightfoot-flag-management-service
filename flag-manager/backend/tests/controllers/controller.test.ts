import { create } from 'domain';
import { createFlag, readAllFlags, readFlag, toggleFlag, deleteFlag } from '../../src/controllers/controller';
import DBPersistence from '../../src/lib/dbPersistence';
import { Request, Response, NextFunction } from 'express';
// TODOS:
// test all happy paths first, then write tests for errors (more specific than just 500),
//  then update backend files to send those specific status codes



// test for createFlag
describe('createFlag', () => {
  // Mock res, req, and next
  const mockReq = { user: { id: '1' }} as Partial<Request>;
  const mockRes = { status: (code: number) => {} } as Partial<Response>;
  const mockNext: NextFunction = jest.fn() as NextFunction;
  
  it('should call addFlag and respond with 201 status', async () => {
    // Mock DBPersistence
    const mockAddFlag = jest.fn().mockResolvedValue(undefined);
    const mockGetAllFlags = jest.fn().mockResolvedValue([]);

    (DBPersistence as jest.Mock).mockImplementation(() => {
      addFlag: mockAddFlag;
      getAllFlags:  mockGetAllFlags;
    });

    await createFlag(mockReq as Request, mockRes as Response, mockNext);
    expect(mockRes.status).toHaveBeenCalledWith(201);
  });
});

// test for readAllFlags
describe('readAllFlags', () => {
  it('should call getAllFlags and respond with array of all flags (flags as objects)', () => {
  
  });
});

// test for readFlag
describe('readFlag', () => {
  it('should call getFlagByKey with flagName and respond with the expected flag object', () => {
  
  });
});

// test for toggleFlag
describe('toggleFlag', () => {
  it('should call toggleFlagEnabled with flagName and respond with 200 status', () => {
  
  });
});

// test for deleteFlag
describe('deleteFlag', () => {
  it('should call deleteFlag with flagName and respond with 204 status', () => {
  
  });
});