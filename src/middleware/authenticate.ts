import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

interface AuthRequest extends Request {
    user?: any;
    token?: string;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as { _id: string };
        const user = await User.findOne({ _id: decoded._id});

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
};
