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
