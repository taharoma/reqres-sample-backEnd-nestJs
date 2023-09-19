declare namespace Express {
  export interface Request {
    userId: string;
    accessToken: string;
    role: string;
  }
}
