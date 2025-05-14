import { defineStore } from 'pinia';
import type { Hotel } from '@/types/hotel';
import axios from 'axios';

export const hotelStore = defineStore('hotel', {
    state: () => ({
        hotels: [] as Hotel[],
        hotel: {} as Hotel, // Changed from null to an empty object
    }),
    getters: {
        getHotels(state): Hotel[] {
            return state.hotels;
        },
        getHotel(state): Hotel {
            return state.hotel;
        },
    },
    actions: {
        async getListHotels(page: number, limit: number) {
            try {
                const response = await axios.get(
                    `/hotel?page=${page}&limit=${limit}`
                );

                this.hotels = response.data.data;
                console.log(response);

                console.log('Hotels fetched successfully:', this.hotels);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        },
        async getItemHotel(id: number) {
            try {
                const response = await axios.get(`/hotel/${id}`);
                this.hotel = response.data;
                console.log('Hotel fetched successfully:', this.hotel);
            } catch (error) {
                console.error('Error fetching hotel:', error);
            }
        },
    },
});
