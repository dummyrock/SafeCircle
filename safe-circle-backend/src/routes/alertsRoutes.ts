import { Router } from 'express';
import AlertsController from '../controllers/alertsController';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();
const alertsController = new AlertsController();

router.post('/alerts', authenticate, alertsController.createAlert);
router.get('/alerts', authenticate, alertsController.getAlerts);

export default router;