import { Request, Response } from 'express';
import UserService from '../services/userService';

class UsersController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async getUserDetails(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await this.userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving user details', error });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const updatedUser = await this.userService.updateUser(userId, req.body);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error });
    }
  }
}

export default UsersController;