import styles from './Info.module.css';
import { useQuery } from '@tanstack/react-query';
import { getProcedure, getProcedureAppointments } from '../../api/procedures';
import { formatDateTime, formatDate } from '../../utils/formatDate';
import { useEffect, useMemo, useState } from 'react';

const Info = ({ selectedProcedureId }) => {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  const {
    data: procedure,
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ['procedure', selectedProcedureId],
    queryFn: () => getProcedure(selectedProcedureId),
    enabled: !!selectedProcedureId,
  });

  const {
    data: appointments = [],
    isLoading: isAppointmentsLoading,
    isFetching: isAppointmentsFetching,
    isError: isAppointmentsError,
  } = useQuery({
    queryKey: ['appointments', selectedProcedureId],
    queryFn: () => getProcedureAppointments(selectedProcedureId),
    enabled: !!selectedProcedureId,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchValue]);

  const isProcedureLoading =
    !selectedProcedureId || isLoading || isFetching || !procedure;

  const isTableLoading =
    !selectedProcedureId || isAppointmentsLoading || isAppointmentsFetching;

  const trimmedValue = debouncedSearch.trim();

  const displayedAppointments = useMemo(() => {
    if (!trimmedValue) return appointments;

    return appointments.filter((appointment) =>
      String(appointment.jin ?? '').includes(trimmedValue),
    );
  }, [appointments, trimmedValue]);

  if (isError) {
    return (
      <main className={styles.info}>
        <div className={styles.errorBox}>
          Greška pri dohvaćanju podataka postupka.
        </div>
      </main>
    );
  }

  if (isAppointmentsError) {
    return (
      <main className={styles.info}>
        <div className={styles.errorBox}>Greška pri dohvaćanju termina.</div>
      </main>
    );
  }

  return (
    <main className={styles.info}>
      <div className={styles.infoHeader}>
        <div>
          {isProcedureLoading ? (
            <>
              <h2>
                <span className={styles.skeletonTitle}></span>
              </h2>

              <p>
                Ukupan broj naručenih pacijenata:{' '}
                <span className={styles.skeletonCount}></span>
              </p>

              <p>
                Datum ažuriranja: <span className={styles.skeletonDate}></span>
              </p>

              <div className={styles.dates}>
                <p>Prvih 5 slobodnih termina:</p>

                <ul>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <li key={index}>
                      <span className={styles.skeletonSlot}></span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              <h2>{procedure.procedure.name}</h2>

              <p>
                Ukupan broj naručenih pacijenata:{' '}
                <strong>{procedure.appointmentCount}</strong>
              </p>

              <p>
                Datum ažuriranja:{' '}
                <strong>{formatDate(procedure.updatedAt)}</strong>
              </p>

              <div className={styles.dates}>
                <p>Prvih 5 slobodnih termina:</p>

                {procedure.availableSlots?.length ? (
                  <ul>
                    {procedure.availableSlots.map((slot) => (
                      <li key={slot.slot_at}>{formatDateTime(slot.slot_at)}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Nema dostupnih termina</p>
                )}
              </div>
            </>
          )}
        </div>

        <div className={styles.inputBox}>
          <input
            type="text"
            placeholder="Pretraži po JIN-u"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.infoTable}>
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
              {isTableLoading ? (
                Array.from({ length: 18 }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <span className={styles.skeletonCell}></span>
                    </td>

                    <td>
                      <span className={styles.skeletonCellSmall}></span>
                    </td>

                    <td>
                      <span className={styles.skeletonCell}></span>
                    </td>

                    <td>
                      <span className={styles.skeletonCell}></span>
                    </td>

                    <td>
                      <span className={styles.skeletonCellLarge}></span>
                    </td>
                  </tr>
                ))
              ) : displayedAppointments.length > 0 ? (
                displayedAppointments.map((appointment) => (
                  <tr key={appointment.appointment_id}>
                    <td>{appointment.jin}</td>
                    <td>{appointment.patient_code}</td>
                    <td>{formatDate(appointment.appointment_date)}</td>
                    <td>{formatDate(appointment.registered_at)}</td>
                    <td>{appointment.department_name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>Zapis nije pronađen</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Info;
