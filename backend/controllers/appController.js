import { query } from '../config/db.js';

export const getProcedures = async (req, res) => {
  try {
    const { rows } = await query(`
      SELECT *, 
      TO_CHAR(datum_azuriranja, 'DD.MM.YYYY. HH24:MI') AS formatted_datum_azuriranja,
      TO_CHAR(termin_1, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_1,
      TO_CHAR(termin_2, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_2,
      TO_CHAR(termin_3, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_3,
      TO_CHAR(termin_4, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_4,
      TO_CHAR(termin_5, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_5
      FROM postupci
      `);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching procedures', error);
    res.status(500).json({ message: error.message });
  }
};

export const getProcedure = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await query(
      `
      SELECT *, 
      TO_CHAR(datum_azuriranja, 'DD.MM.YYYY. HH24:MI') AS formatted_datum_azuriranja,
      TO_CHAR(termin_1, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_1,
      TO_CHAR(termin_2, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_2,
      TO_CHAR(termin_3, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_3,
      TO_CHAR(termin_4, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_4,
      TO_CHAR(termin_5, 'DD.MM.YYYY. HH24:MI') AS formatted_termin_5
      FROM postupci WHERE postupci_id = $1
      `,
      [id],
    );

    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching procedure', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAppointments = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows } = await query(
      `
      SELECT *,
      TO_CHAR(datum_termina, 'DD.MM.YYYY.') AS formatted_datum_termina,
      TO_CHAR(datum_upisa, 'DD.MM.YYYY.') AS formatted_datum_upisa
      FROM narudzbe
      WHERE postupci_id = $1
      `,
      [id],
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching appointments', error);
    res.status(500).json({ message: error.message });
  }
};
