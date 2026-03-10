import { create } from 'zustand';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useAppStore = create((set) => ({
  searchValue: '',
  setSearchValue: (value) => set({ searchValue: value }),

  mobNavOpen: false,
  setMobNavOpen: (mobNavOpen) => set({ mobNavOpen }),

  procedures: [],
  appointments: [],
  loading: false,
  error: null,
  currentProcedure: { postupci_id: null, naziv_postupka: '' },
  loadingInitialData: false,
  appointmentsLoading: false,

  setCurrentProcedure: (procedure) => set({ currentProcedure: procedure }),
  setAppointments: (appointments) => set({ appointments }),

  fetchProcedures: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(`${BASE_URL}/api/procedures`);
      set({ procedures: data, error: null });
    } catch (error) {
      console.error('Error fetching procedures:', error);
      set({ error: 'Error fetching procedures', procedures: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchAppointments: async (id) => {
    set({ appointmentsLoading: true });
    try {
      const { data } = await axios.get(`${BASE_URL}/api/appointments/${id}`);
      set({ appointments: data, error: null });
    } catch (error) {
      console.error('Error fetching appointments', error);
      set({ error: 'Error fetching appointments', appointments: [] });
    } finally {
      set({ appointmentsLoading: false });
    }
  },

  fetchInitialData: async () => {
    set({ loadingInitialData: true });
    try {
      const { data: proceduresData } = await axios.get(
        `${BASE_URL}/api/procedures`,
      );
      set({ procedures: proceduresData });

      if (proceduresData.length > 0) {
        const firstId = proceduresData[0].postupci_id;
        const initialProcedure = await axios.get(
          `${BASE_URL}/api/procedures/${firstId}`,
        );
        const currentProcedure = initialProcedure.data[0];
        set({ currentProcedure });

        const initialAppointments = await axios.get(
          `${BASE_URL}/api/appointments/${currentProcedure.postupci_id}`,
        );
        set({ appointments: initialAppointments.data });
      }
    } catch (error) {
      console.error('Error fetching initial data', error);
      set({ error: 'Error fetching initial data' });
    } finally {
      set({ loadingInitialData: false });
    }
  },
}));
