import { Request, Response } from 'express';

export const authUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ success: true, data: req.currentUser });
  } catch (e) {
    let message;
    if (e instanceof Error) message = e.message;
    else message = String(e);
    res.status(400).json({ success: false, message });
  }
};
