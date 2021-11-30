import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import prisma from '../client';
import { Password } from '../utils/password';
import generateToken from '../utils/generateToken';

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password: enteredPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new BadRequestError('Invalid Credentials');
    }

    // check for password match
    const isMatch = await Password.compare(user.password, enteredPassword);

    if (!isMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    const { password, createdAt, updatedAt, ...newUser } = user;

    const token = generateToken(user);

    res.status(200).json({ success: true, data: { ...newUser, token } });
  } catch (e) {
    let message;
    if (e instanceof Error) message = e.message;
    else message = String(e);
    res.status(400).json({ success: false, message });
  }
};
