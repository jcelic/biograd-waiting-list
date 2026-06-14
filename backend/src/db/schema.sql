DROP TABLE IF EXISTS appointments CASCADE;
DROP TABLE IF EXISTS available_slots CASCADE;
DROP TABLE IF EXISTS patients CASCADE;
DROP TABLE IF EXISTS procedures CASCADE;
DROP TABLE IF EXISTS departments CASCADE;


CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

CREATE TABLE patients (
    id SERIAL PRIMARY KEY,
    jin VARCHAR(20) NOT NULL UNIQUE,
    patient_code VARCHAR(12) NOT NULL
);

CREATE TABLE procedures (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    department_id INTEGER NOT NULL,

    CONSTRAINT procedures_department_id_fkey
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
);

CREATE TABLE appointments (
    id SERIAL PRIMARY KEY,
    procedure_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    appointment_date DATE NOT NULL,
    registered_at DATE NOT NULL,
    department_id INTEGER NOT NULL,

    CONSTRAINT appointments_procedure_id_fkey
        FOREIGN KEY (procedure_id)
        REFERENCES procedures(id)
        ON DELETE CASCADE,

    CONSTRAINT appointments_patient_id_fkey
        FOREIGN KEY (patient_id)
        REFERENCES patients(id)
        ON DELETE CASCADE,

    CONSTRAINT appointments_department_id_fkey
        FOREIGN KEY (department_id)
        REFERENCES departments(id)
);

CREATE TABLE available_slots (
    id SERIAL PRIMARY KEY,
    procedure_id INTEGER NOT NULL,
    slot_at TIMESTAMP NOT NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,

    CONSTRAINT available_slots_procedure_id_fkey
        FOREIGN KEY (procedure_id)
        REFERENCES procedures(id)
        ON DELETE CASCADE
);