import express from 'express';
import bodyParser from 'body-parser';
import { alertsRoutes } from './routes/alertsRoutes';
import { authRoutes } from './routes/authRoutes';
import { usersRoutes } from './routes/usersRoutes';
import { authMiddleware } from './middlewares/authMiddleware';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/alerts', alertsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', authMiddleware, usersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;