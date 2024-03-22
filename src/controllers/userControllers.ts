import { Request, Response } from 'express';
import { User } from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateAuthToken = (user: any) => {
    return jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET || 'secret');
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);
        user.password = await bcrypt.hash(user.password, 8);
        await user.save();
        const token = generateAuthToken(user);
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send({ error: 'Unable to login' });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: 'Unable to login' });
        }
        const token = generateAuthToken(user);
        res.send({ user, token });
    } catch (error) {
        res.status(500).send();
    }
};
