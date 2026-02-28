import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { alertsRoutes } from './routes/alertsRoutes';
import { authRoutes } from './routes/authRoutes';
import { usersRoutes } from './routes/usersRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import { aiRoutes } from './routes/aiRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '15mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '15mb' }));

app.use('/api/alerts', alertsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
