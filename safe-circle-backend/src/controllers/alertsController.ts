import { Request, Response } from 'express';
import { AlertService } from '../services/alertService';

export class AlertsController {
  private alertService: AlertService;

  constructor() {
    this.alertService = new AlertService();
  }

  public async createAlert(req: Request, res: Response): Promise<Response> {
    try {
      const alertData = req.body;
      const newAlert = await this.alertService.createAlert(alertData);
      return res.status(201).json(newAlert);
    } catch (error) {
      return res.status(500).json({ message: 'Error creating alert', error });
    }
  }

  public async getAlerts(req: Request, res: Response): Promise<Response> {
    try {
      const alerts = await this.alertService.getAlerts();
      return res.status(200).json(alerts);
    } catch (error) {
      return res.status(500).json({ message: 'Error retrieving alerts', error });
    }
  }
}