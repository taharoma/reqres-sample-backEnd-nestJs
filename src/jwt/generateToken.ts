import * as jwt from 'jsonwebtoken';

const generateToken = (payload: object): string => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};

export default generateToken;
