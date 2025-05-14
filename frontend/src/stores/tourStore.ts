import { defineStore } from 'pinia';

import type { Tour } from '@/types/tour';
import type { Itinerary } from '@/types/itinerary';
import axios from 'axios';

export const tourStore = defineStore('tour', {
    state: () => ({
        tours: [] as Tour[],
        tour: {} as Tour,
        itinerary: [] as Itinerary[],
    }),
    actions: {
        async getTourList(page: number, limit: number) {
            try {
                const response = await axios.get(
                    `/tour?page=${page}&limit=${limit}`
                );
                this.tours = response.data.data;
            } catch (error) {
                console.error('Error fetching tours:', error);
            } finally {
                // Optionally handle any cleanup or final actions here
            }
        },
        async getTourItem(id: number) {
            try {
                const response = await axios.get(`/tour/${id}`);
                this.tour = response.data;
            } catch (error) {
                console.error('Error fetching tour:', error);
            }
        },
        async getListItinerary(id: number) {
            try {
                const response = await axios.get(`/itinerary/${id}`);
                console.log('response', response);

                this.itinerary = response.data;
            } catch (error) {
                console.error('Error fetching tour:', error);
            }
        },
    },
    getters: {
        getTours: (state) => {
            return state.tours;
        },
        getTour: (state) => {
            return state.tour;
        },
        getItinerary: (state) => {
            return state.itinerary;
        },
    },
});
