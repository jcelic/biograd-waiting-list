import pool from '../db/pool.js';

export const getProcedures = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT id, name 
      FROM procedures 
      ORDER BY id
      `,
    );

    res.json(result.rows);
  } catch (error) {
    console.error('GET procedures error:', error);

    res.status(500).json({
      error: 'Failed to fetch procedures',
    });
  }
};

export const getProcedure = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: 'Invalid procedure id',
      });
    }

    const procedureResult = await pool.query(
      `
      SELECT id, name 
      FROM procedures 
      WHERE id = $1
      `,
      [id],
    );

    const procedure = procedureResult.rows[0];
    if (!procedure) {
      return res.status(404).json({
        error: 'Procedure not found',
      });
    }

    const appointmentCountResult = await pool.query(
      `
      SELECT COUNT(*) 
      FROM appointments 
      WHERE procedure_id = $1
      `,
      [id],
    );

    const appointmentCount = +appointmentCountResult.rows[0].count;

    const availableSlotsResult = await pool.query(
      `
      SELECT slot_at 
      FROM available_slots 
      WHERE procedure_id = $1
      AND slot_at >= NOW()
      ORDER BY slot_at ASC 
      LIMIT 5
      `,
      [id],
    );

    const availableSlots = availableSlotsResult.rows;

    const procedureData = {
      procedure,
      appointmentCount,
      availableSlots,
      updatedAt: new Date(),
    };
    res.json(procedureData);
  } catch (error) {
    console.error('GET procedure error:', error);

    res.status(500).json({
      error: 'Failed to fetch procedure',
    });
  }
};

export const getProcedureAppointments = async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: 'Invalid procedure id',
      });
    }
    const procedureAppointmentsResult = await pool.query(
      `
    SELECT
      appointments.id AS appointment_id,
      patients.jin,
      patients.patient_code,
      appointments.appointment_date,
      appointments.registered_at,
      departments.name AS department_name
    FROM appointments
    JOIN patients
    ON appointments.patient_id = patients.id
    JOIN procedures
    ON appointments.procedure_id = procedures.id
    JOIN departments
    ON procedures.department_id = departments.id
    WHERE appointments.procedure_id = $1
    ORDER BY appointments.appointment_date ASC
    `,
      [id],
    );

    res.json(procedureAppointmentsResult.rows);
  } catch (error) {
    console.error('GET procedure appointments error:', error);

    res.status(500).json({
      error: 'Failed to fetch procedure appointments',
    });
  }
};
