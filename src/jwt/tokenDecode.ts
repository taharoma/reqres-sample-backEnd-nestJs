import * as jwt from 'jsonwebtoken';

const tokenDecode = async (token: string): Promise<object | null> => {
  try {
    const data = jwt.decode(token);
    if (data) {
      return data as object;
    }
    return null;
  } catch (e) {
    console.log({ e });
    return null;
  }
};

export default tokenDecode;
