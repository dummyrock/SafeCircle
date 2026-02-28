import { Alert } from '../models/Alert';
import { User } from '../models/User';
import { Location } from '../models/Location';

export class AlertService {
  private alerts: Alert[] = [];

  createAlert(userId: string, location: Location, message: string): Alert {
    const newAlert: Alert = {
      id: this.generateId(),
      userId,
      location,
      message,
      timestamp: new Date(),
    };
    this.alerts.push(newAlert);
    return newAlert;
  }

  getAlerts(): Alert[] {
    return this.alerts;
  }

  private generateId(): string {
    return (this.alerts.length + 1).toString();
  }
}