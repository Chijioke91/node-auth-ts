import jwt from 'jsonwebtoken';

type User = {
  id: string;
  email: string;
};

export default function (user: User) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET!);
}
