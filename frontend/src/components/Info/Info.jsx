import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import styles from './Info.module.css';
import Loader from '../Loader/Loader';

const Info = () => {
  const {
    fetchAppointments,
    appointments,
    currentProcedure,
    loadingInitialData,
    fetchInitialData,
    searchValue,
    setSearchValue,
    mobNavOpen,
    setMobNavOpen,
    appointmentsLoading,
  } = useAppStore();

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.jin.includes(searchValue),
  );

  const {
    postupci_id,
    naziv_postupka,
    br_narucenih_pacijenata,
    formatted_datum_azuriranja,
    formatted_termin_1,
    formatted_termin_2,
    formatted_termin_3,
    formatted_termin_4,
    formatted_termin_5,
  } = currentProcedure;

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    postupci_id && fetchAppointments(postupci_id);
  }, [fetchAppointments, postupci_id]);

  const handleOverlayClick = () => {
    if (mobNavOpen) setMobNavOpen(false);
  };

  if (loadingInitialData) return <Loader />;

  return (
    <main className={styles.info}>
      <div
        onClick={handleOverlayClick}
        className={`${styles.overlay} ${mobNavOpen ? styles.showOverlay : ''}`}
      ></div>

      <div className={styles['info-header']}>
        <div>
          <h2>{naziv_postupka}</h2>
          <p>
            Ukupan broj naručenih pacijenata:
            <strong> {br_narucenih_pacijenata}</strong>
          </p>
          <p>
            Datum ažuriranja:<strong> {formatted_datum_azuriranja}</strong>
          </p>
          <div className={styles.dates}>
            <p>Prvih 5 slobodnih termina:</p>
            <ul>
              <li>{formatted_termin_1}</li>
              <li>{formatted_termin_2}</li>
              <li>{formatted_termin_3}</li>
              <li>{formatted_termin_4}</li>
              <li>{formatted_termin_5}</li>
            </ul>
          </div>
        </div>

        <div>
          <input
            type="text"
            placeholder="Pretraži po JIN-u"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className={styles['info-table']}>
        <div>
          <table>
            <thead>
              <tr>
                <th>JIN</th>
                <th>ID Pacijenta</th>
                <th>Datum Termina</th>
                <th>Datum Upisa</th>
                <th>Odjel/Ambulanta</th>
              </tr>
            </thead>

            <tbody>
              {appointmentsLoading ? (
                Array.from({ length: 18 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <div className={styles.skeleton}></div>
                    </td>
                    <td>
                      <div className={styles.skeletonSmall}></div>
                    </td>
                    <td>
                      <div className={styles.skeletonSmall}></div>
                    </td>
                    <td>
                      <div className={styles.skeletonSmall}></div>
                    </td>
                    <td>
                      <div className={styles.skeleton}></div>
                    </td>
                  </tr>
                ))
              ) : filteredAppointments.length === 0 ? (
                <tr className={styles['no-records']}>
                  <td>Zapis nije pronađen</td>
                </tr>
              ) : (
                filteredAppointments.map((appointment) => {
                  return (
                    <tr key={appointment.jin}>
                      <td>{appointment.jin}</td>
                      <td>{appointment.pacijent_id}</td>
                      <td>{appointment.formatted_datum_termina}</td>
                      <td>{appointment.formatted_datum_upisa}</td>
                      <td>{appointment.odjel_ambulanta}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Info;
