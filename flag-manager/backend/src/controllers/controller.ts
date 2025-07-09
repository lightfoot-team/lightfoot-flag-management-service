import {Request, Response, NextFunction} from 'express';

// Create 
export const createFlag = (req: Request, res: Response, next: NextFunction) => {
  try {
    const {name} = req.body;
    // ...
    res.status(201).json({});
  } catch (err) {
    next(err);
  }
}

export const readAllFlags = (req: Request, res: Response, next: NextFunction) => {
}

export const updateFlag = (req: Request, res: Response, next: NextFunction) => {
}

export const deleteFlag = (req: Request, res: Response, next: NextFunction) => {
}
