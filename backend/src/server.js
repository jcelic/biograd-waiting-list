import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import proceduresRoutes from './routes/procedures.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.json());

app.use('/api/procedures', proceduresRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
