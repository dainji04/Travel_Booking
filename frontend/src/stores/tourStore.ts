import { defineStore } from 'pinia';

import type { Tour } from '@/types/tour';
import axios from 'axios';

export const tourStore = defineStore('tour', {
    state: () => ({
        tours: [] as Tour[],
        tour: null as Tour | null,
    }),
    actions: {
        async getTourList() {
            try {
                const response = await axios.get('/tour');
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching tours:', error);
            } finally {
                // Optionally handle any cleanup or final actions here
            }
        },
    },
    getters: {},
});
