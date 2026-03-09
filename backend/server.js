import express from 'express';
import { query } from './config/db.js';
import appRoutes from './routes/appRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', appRoutes);

const initDB = async () => {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS postupci(
      postupci_id SERIAL PRIMARY KEY,
      naziv_postupka TEXT UNIQUE,
      br_narucenih_pacijenata INTEGER NOT NULL,
      datum_azuriranja TIMESTAMP NOT NULL,
      termin_1 TIMESTAMP,
      termin_2 TIMESTAMP,
      termin_3 TIMESTAMP,
      termin_4 TIMESTAMP,
      termin_5 TIMESTAMP
      )
      `);

    await query(`
        CREATE TABLE IF NOT EXISTS narudzbe(
        postupci_id INT NOT NULL REFERENCES postupci(postupci_id) ON DELETE CASCADE,
        naziv_postupka TEXT,
        jin TEXT NOT NULL UNIQUE,
        datum_termina DATE NOT NULL,
        datum_upisa DATE NOT NULL,
        odjel_ambulanta TEXT NOT NULL,
        pacijent_id TEXT NOT NULL
        )  
        `);
  } catch (error) {
    console.error('Error initializing database', error.message);
    process.exit(1);
  }
};

initDB().then(() => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on ${port}`));
});
