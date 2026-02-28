import { Schema, model, Document } from 'mongoose';

interface IAlert extends Document {
  userId: string;
  location: {
    latitude: number;
    longitude: number;
  };
  timestamp: Date;
}

const alertSchema = new Schema<IAlert>({
  userId: { type: String, required: true },
  location: {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  timestamp: { type: Date, default: Date.now },
});

const Alert = model<IAlert>('Alert', alertSchema);

export default Alert;