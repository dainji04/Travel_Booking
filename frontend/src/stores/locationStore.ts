import { defineStore } from 'pinia';
import axios from 'axios';

export const useLocationStore = defineStore('location', {
    state: () => ({
        location: null as any | null,
        error: null as string | null,
    }),
    getters: {
        getLocationData: (state) => state.location,
    },
    actions: {
        async fetchLocation(id: string) {
            try {
                const response = await axios.get(`/location/${id}/tours`);
                this.location = response.data;
                this.error = null;
            } catch (error) {
                console.error('Error fetching location:', error);
                this.error = 'Failed to fetch location';
                throw error;
            }
        },
    },
});
