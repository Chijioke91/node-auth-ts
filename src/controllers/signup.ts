import prisma from '../client';
import { Request, Response } from 'express';
import { Password } from '../utils/password';
import { BadRequestError } from '../errors/bad-request-error';
import generateToken from '../utils/generateToken';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, password: enteredPassword } = req.body;

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      throw new BadRequestError('Email already in use');
    }

    // let's hash password before we save to our db
    const hash = await Password.toHash(enteredPassword);

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
      },
    });

    // let's format this to return what we want, you can choose to return what you want
    const { password, createdAt, updatedAt, ...newUser } = user;

    const token = generateToken(user);

    res.status(201).json({ success: true, data: { ...newUser, token } });
  } catch (e) {
    let message;
    if (e instanceof Error) message = e.message;
    else message = String(e);
    res.status(400).json({ success: false, message });
  }
};
