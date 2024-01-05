import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export default function validateRequest(
    //eslint-disable-next-line
    dtoClass: any,
) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const output = plainToInstance(dtoClass, req.body);
        const errors = await validate(output);

        if (errors.length > 0) {
            res.status(400).json({ errors });
        } else {
            req.body = output;
            next();
        }
    };
}
