import { defineStore } from 'pinia';
import type { Hotel } from '@/types/hotel';

interface HotelStore {
    hotels: Hotel[];
    hotel: Hotel | null;
}

export const hotelStore = defineStore('hotel', {
    state: (): HotelStore => ({
        hotels: [],
        hotel: null,
    }),
    getters: {
        getHotels(state): Hotel[] {
            return state.hotels;
        },
        getHotel(state): Hotel | null {
            return state.hotel;
        },
    },
    actions: {},
});
