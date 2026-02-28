import { Router } from 'express';
import { summarizeAudio } from '../services/geminiService';

export const aiRoutes = Router();

aiRoutes.post('/summarize', async (req, res) => {
  const { audioBase64, mimeType } = req.body ?? {};

  if (!audioBase64 || !mimeType) {
    return res.status(400).json({ message: 'audioBase64 and mimeType are required.' });
  }

  try {
    const summary = await summarizeAudio(String(audioBase64), String(mimeType));
    return res.status(200).json({ summary });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error while summarizing.';
    return res.status(500).json({ message });
  }
});
