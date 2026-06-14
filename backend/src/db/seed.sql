SET client_encoding = 'UTF8';

INSERT INTO departments (id, name) VALUES (1, 'Kardiološka ambulanta II');
INSERT INTO departments (id, name) VALUES (2, 'Kardiološka dijagnostika');
INSERT INTO departments (id, name) VALUES (3, 'Ambulanta fizikalne i medicinske rehabilitacije');
INSERT INTO departments (id, name) VALUES (4, 'Fizijatrijska dijagnostika');
INSERT INTO departments (id, name) VALUES (5, 'Ortopedska ambulanta I');
INSERT INTO departments (id, name) VALUES (6, 'Klasične radiološke pretrage');
INSERT INTO departments (id, name) VALUES (7, 'Radiološki UZV');


INSERT INTO procedures (id, name, department_id) VALUES (1, 'Prvi pregled kardiologa', 1);
INSERT INTO procedures (id, name, department_id) VALUES (2, 'Kontrolni pregled kardiologa', 1);
INSERT INTO procedures (id, name, department_id) VALUES (3, 'UZV srca', 2);
INSERT INTO procedures (id, name, department_id) VALUES (4, 'Ergometrija', 2);
INSERT INTO procedures (id, name, department_id) VALUES (5, 'Holter EKG', 2);
INSERT INTO procedures (id, name, department_id) VALUES (6, 'KMAT- kontinuirano mjerenje arterijskog tlaka', 2);
INSERT INTO procedures (id, name, department_id) VALUES (7, 'EKG', 2);
INSERT INTO procedures (id, name, department_id) VALUES (8, 'Prvi pregled fizijatra', 3);
INSERT INTO procedures (id, name, department_id) VALUES (9, 'Kontrolni pregled fizijatra', 3);
INSERT INTO procedures (id, name, department_id) VALUES (10, 'EMG - Elektromiografija', 4);
INSERT INTO procedures (id, name, department_id) VALUES (11, 'EMNG - Elektroneurografija', 4);
INSERT INTO procedures (id, name, department_id) VALUES (12, 'Prvi pregled ortopeda', 5);
INSERT INTO procedures (id, name, department_id) VALUES (13, 'Kontrolni pregled ortopeda', 5);
INSERT INTO procedures (id, name, department_id) VALUES (14, 'Prvi pregled dječjeg ortopeda', 5);
INSERT INTO procedures (id, name, department_id) VALUES (15, 'Kontrolni pregled dječjeg ortopeda', 5);
INSERT INTO procedures (id, name, department_id) VALUES (16, 'UZV dječjeg kuka', 5);
INSERT INTO procedures (id, name, department_id) VALUES (17, 'RTG srca i pluća', 6);
INSERT INTO procedures (id, name, department_id) VALUES (18, 'RTG kostiju u dvije projekcije', 6);
INSERT INTO procedures (id, name, department_id) VALUES (19, 'RTG cervikotorakalnog prijelaza', 6);
INSERT INTO procedures (id, name, department_id) VALUES (20, 'RTG cervikalne kralježnice', 6);
INSERT INTO procedures (id, name, department_id) VALUES (21, 'RTG cervikalne kralježnice - funkcionalno', 6);
INSERT INTO procedures (id, name, department_id) VALUES (22, 'RTG lumbosakralne kralježnice', 6);
INSERT INTO procedures (id, name, department_id) VALUES (23, 'RTG lumbosakralne kralježnice - funkcionalno', 6);
INSERT INTO procedures (id, name, department_id) VALUES (24, 'RTG gležnja', 6);
INSERT INTO procedures (id, name, department_id) VALUES (25, 'RTG hemitoraksa', 6);
INSERT INTO procedures (id, name, department_id) VALUES (26, 'RTG ključne kosti', 6);
INSERT INTO procedures (id, name, department_id) VALUES (27, 'RTG koljena', 6);
INSERT INTO procedures (id, name, department_id) VALUES (28, 'RTG kuka', 6);
INSERT INTO procedures (id, name, department_id) VALUES (29, 'RTG lakta', 6);
INSERT INTO procedures (id, name, department_id) VALUES (30, 'RTG nadlaktice', 6);
INSERT INTO procedures (id, name, department_id) VALUES (31, 'RTG natkoljenice', 6);
INSERT INTO procedures (id, name, department_id) VALUES (32, 'RTG patele', 6);
INSERT INTO procedures (id, name, department_id) VALUES (33, 'RTG petne kosti', 6);
INSERT INTO procedures (id, name, department_id) VALUES (34, 'RTG podlaktice', 6);
INSERT INTO procedures (id, name, department_id) VALUES (35, 'RTG procjena koštane dobi - šaka', 6);
INSERT INTO procedures (id, name, department_id) VALUES (36, 'RTG prsta ruke', 6);
INSERT INTO procedures (id, name, department_id) VALUES (37, 'RTG ramena', 6);
INSERT INTO procedures (id, name, department_id) VALUES (38, 'RTG ručnog zgloba', 6);
INSERT INTO procedures (id, name, department_id) VALUES (39, 'RTG sakruma i kokcigisa', 6);
INSERT INTO procedures (id, name, department_id) VALUES (40, 'RTG sakroilijakalnih zglobova', 6);
INSERT INTO procedures (id, name, department_id) VALUES (41, 'RTG skafoidne kosti', 6);
INSERT INTO procedures (id, name, department_id) VALUES (42, 'RTG skalpule', 6);
INSERT INTO procedures (id, name, department_id) VALUES (43, 'RTG sternuma', 6);
INSERT INTO procedures (id, name, department_id) VALUES (44, 'RTG stopala', 6);
INSERT INTO procedures (id, name, department_id) VALUES (45, 'RTG šake', 6);
INSERT INTO procedures (id, name, department_id) VALUES (46, 'RTG torakalne kralježnice', 6);
INSERT INTO procedures (id, name, department_id) VALUES (47, 'RTG zdjelice', 6);
INSERT INTO procedures (id, name, department_id) VALUES (48, 'RTG cijele kralježnice', 6);
INSERT INTO procedures (id, name, department_id) VALUES (49, 'RTG cervikalne i lumbo sakralne kralježnice', 6);
INSERT INTO procedures (id, name, department_id) VALUES (50, 'UZV abdomena', 7);
INSERT INTO procedures (id, name, department_id) VALUES (51, 'UZV color doppler vena', 7);
INSERT INTO procedures (id, name, department_id) VALUES (52, 'UZV lokomotornog sustava', 7);
INSERT INTO procedures (id, name, department_id) VALUES (53, 'UZV color doppler arterija i vena', 7);
INSERT INTO procedures (id, name, department_id) VALUES (54, 'UZV color doppler arterija', 7);


INSERT INTO patients (id, jin, patient_code)
SELECT
    gs AS id,
    LPAD(gs::text, 18, '0') AS jin,
    'P' || LPAD(gs::text, 5, '0') AS patient_code
FROM generate_series(1, 810) AS gs;

INSERT INTO appointments (
    id,
    procedure_id,
    patient_id,
    appointment_date,
    registered_at,
    department_id
)
SELECT
    ROW_NUMBER() OVER () AS id,
    p.id AS procedure_id,
    ROW_NUMBER() OVER () AS patient_id,
    DATE '2026-01-01' + ((ROW_NUMBER() OVER ())::int % 365) AS appointment_date,
    DATE '2025-06-01' + ((ROW_NUMBER() OVER ())::int % 180) AS registered_at,
    p.department_id
FROM procedures p
CROSS JOIN generate_series(1, 15) AS gs;

INSERT INTO available_slots (
    id,
    procedure_id,
    slot_at,
    is_available
)
SELECT
    ROW_NUMBER() OVER () AS id,
    p.id AS procedure_id,
    TIMESTAMP '2026-09-01 08:00:00'
        + ((gs - 1) * INTERVAL '7 days')
        + ((gs - 1) * INTERVAL '20 minutes') AS slot_at,
    true AS is_available
FROM procedures p
CROSS JOIN generate_series(1, 5) AS gs;


SELECT setval('departments_id_seq', (SELECT MAX(id) FROM departments));
SELECT setval('procedures_id_seq', (SELECT MAX(id) FROM procedures));
SELECT setval('patients_id_seq', (SELECT MAX(id) FROM patients));
SELECT setval('appointments_id_seq', (SELECT MAX(id) FROM appointments));
SELECT setval('available_slots_id_seq', (SELECT MAX(id) FROM available_slots));