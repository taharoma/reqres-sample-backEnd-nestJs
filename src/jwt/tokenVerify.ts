import * as jwt from 'jsonwebtoken';

const tokenVerify = async (token: string): Promise<object | 'expire'> => {
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET) as object;
    return data;
  } catch (e) {
    return 'expire';
  }
};

export default tokenVerify;
