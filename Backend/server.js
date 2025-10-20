import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import apiRouter from './routes/index.js';
import authRouter from './routes/authRoutes.js';
import homeRouter from './routes/homeRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/', apiRouter);
app.use('/auth', authRouter);
app.use('/home', homeRouter);

app.listen(PORT, () => {
  console.log(`CozyClip backend listening on port ${PORT}`);
});


