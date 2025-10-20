import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'CozyClip API', version: '0.1.0' });
});

export default router;


