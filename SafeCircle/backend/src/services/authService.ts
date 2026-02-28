import { User } from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export class AuthService {
  async register(userData: Omit<User, 'id'>): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = { ...userData, password: hashedPassword };
    // Save newUser to the database (implementation not shown)
    return newUser; // Return the created user
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.findUserByEmail(email); // Implementation not shown
    if (user && await bcrypt.compare(password, user.password)) {
      return this.generateToken(user.id);
    }
    return null; // Invalid credentials
  }

  private generateToken(userId: string): string {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
  }

  private async findUserByEmail(email: string): Promise<User | null> {
    // Logic to find user by email in the database (implementation not shown)
    return null; // Placeholder return
  }
}