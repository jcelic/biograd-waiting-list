import { query } from '../config/db.js';

const SAMPLE_PROCEDURES = [
  {
    naziv_postupka: 'Prvi pregled kardiologa',
    br_narucenih_pacijenata: 387,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'Kontrolni pregled kardiologa',
    br_narucenih_pacijenata: 132,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'UZV srca',
    br_narucenih_pacijenata: 115,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'Ergometrija',
    br_narucenih_pacijenata: 28,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'Holter EKG',
    br_narucenih_pacijenata: 77,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'KMAT- kontinuirano mjerenje arterijskog tlaka',
    br_narucenih_pacijenata: 82,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'EKG',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'Prvi pregled fizijatra',
    br_narucenih_pacijenata: 239,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'Kontrolni pregled fizijatra',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'EMG - Elektromiografija',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'EMNG - Elektromioneurografija',
    br_narucenih_pacijenata: 35,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'Prvi pregled ortopeda',
    br_narucenih_pacijenata: 356,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'Kontrolni pregled ortopeda',
    br_narucenih_pacijenata: 182,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'Prvi pregled dječjeg ortopeda',
    br_narucenih_pacijenata: 6,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'Kontrolni pregled dječjeg ortopeda',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'UZV dječjeg kuka',
    br_narucenih_pacijenata: 12,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG srca i pluća',
    br_narucenih_pacijenata: 1,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG kostiju u dvije projekcije',
    br_narucenih_pacijenata: 1,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG cervikotorakalnog prijelaza',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG cervikalne kralježnice',
    br_narucenih_pacijenata: 2,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG cervikalne kralježnice - funkcionalno',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG lumbosakralne kralježnice',
    br_narucenih_pacijenata: 4,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG lumbosakralne kralježnice - funkcionalno',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG gležnja',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG hemitoraksa',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG ključne kosti',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG koljena',
    br_narucenih_pacijenata: 2,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG kuka',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG lakta',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG nadlaktice',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG natkoljenice',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG patele',
    br_narucenih_pacijenata: 1,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG petne kosti',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG podlaktice',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG procjena koštane dobi - šaka',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG prsta ruke',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG ramena',
    br_narucenih_pacijenata: 4,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG ručnog zgloba',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG sakruma i kokcigisa',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG sakroilijakalnih zglobova',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG skafoidne kosti',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG skalpule',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG sternuma',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG stopala',
    br_narucenih_pacijenata: 1,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG šake',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG torakalne kralježnice',
    br_narucenih_pacijenata: 1,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG zdjelice',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'RTG cijele kralježnice',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'RTG cervikalne i lumbo sakralne kralježnice',
    br_narucenih_pacijenata: 0,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'UZV abdomena',
    br_narucenih_pacijenata: 132,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'UZV color doppler vena',
    br_narucenih_pacijenata: 26,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'UZV lokomotornog sustava',
    br_narucenih_pacijenata: 63,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },

  {
    naziv_postupka: 'UZV color doppler arterija i vena',
    br_narucenih_pacijenata: 11,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-09-23 08:00:00',
    termin_2: '2025-09-23 08:20:00',
    termin_3: '2025-09-23 08:40:00',
    termin_4: '2025-09-30 08:00:00',
    termin_5: '2025-09-30 08:20:00',
  },

  {
    naziv_postupka: 'UZV color doppler arterija',
    br_narucenih_pacijenata: 2,
    datum_azuriranja: '2025-04-01 16:24:00',
    termin_1: '2025-07-15 09:40:00',
    termin_2: '2025-07-22 09:00:00',
    termin_3: '2025-07-22 09:20:00',
    termin_4: '2025-07-22 09:40:00',
    termin_5: '2025-07-29 09:00:00',
  },
];

const seedDatabase = async () => {
  try {
    await query(`TRUNCATE TABLE postupci RESTART IDENTITY CASCADE`);

    for (const procedure of SAMPLE_PROCEDURES) {
      await query(`
      INSERT INTO postupci (naziv_postupka, br_narucenih_pacijenata, datum_azuriranja, termin_1, termin_2, termin_3, termin_4, termin_5)
      VALUES ('${procedure.naziv_postupka}', ${procedure.br_narucenih_pacijenata}, '${procedure.datum_azuriranja}', '${procedure.termin_1}', '${procedure.termin_2}', '${procedure.termin_3}', '${procedure.termin_4}', '${procedure.termin_5}')
      `);
    }
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
