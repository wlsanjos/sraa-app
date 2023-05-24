import jwt from 'jsonwebtoken';

export interface AuthPayload {
  id: string;
  name: string;
  passport: string;
  role: {
    id: string;
    name: string;
  };
}
export interface TokenResponse {
  token: string;
  user: AuthPayload;
}
export class AuthService {
  private readonly jwtSecret: string;

  constructor(jwtSecret: string) {
    this.jwtSecret = jwtSecret;
  }

  generateToken(payload: AuthPayload): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  verifyToken(token: string): AuthPayload {
    return jwt.verify(token, this.jwtSecret) as AuthPayload;
  }
}
