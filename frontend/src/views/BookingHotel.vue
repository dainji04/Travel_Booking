<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';
import axios from 'axios';
import { get } from '@vueuse/core';

const location = ref<string>('');
const dateStart = ref<string>('');
const dateEnd = ref<string>('');
const adults = ref<number>(1);
const children = ref<number>(0);

function searchHotels(): void {
    const searchParams = {
        location: location.value,
        dateStart: dateStart.value,
        dateEnd: dateEnd.value,
        adults: adults.value,
        children: children.value,
    };
    console.log('Searching with parameters:', searchParams);
    // Add your search logic here
}

const provinces = reactive<any[]>([]);

const getProvince = async () => {
    try {
        const response = await axios.get(
            'https://provinces.open-api.vn/api/p/',
            {
                withCredentials: false,
            }
        );

        provinces.push(...response.data.map((item: any) => item.name));
    } catch (error) {
        console.error('Error fetching provinces:', error);
    }
};

getProvince();

watch([dateStart, dateEnd], ([newStart, newEnd]) => {
    if (newEnd && newStart && newEnd < newStart) {
        alert('End date cannot be before start date.');
        dateEnd.value = ''; // Reset the end date
    }
});

const openDatePicker = (event: Event) => {
    console.log(1);

    const target = event.target as HTMLInputElement;
    if (target) {
        target.showPicker();
    }
};
</script>

<template>
    <div class="research">
        <div class="research-panel">
            <form class="research-form" @submit.prevent="searchHotels">
                <div class="form-group">
                    <select id="location" v-model="location">
                        <option value="" disabled>Select a province</option>
                        <option
                            v-for="province in provinces"
                            :key="province"
                            :value="province"
                        >
                            {{ province }}
                        </option>
                    </select>
                </div>
                <div class="form-group">
                    <input
                        type="date"
                        id="dateStart"
                        v-model="dateStart"
                        @click="openDatePicker"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="date"
                        id="dateEnd"
                        v-model="dateEnd"
                        @click="openDatePicker"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="number"
                        id="adults"
                        v-model.number="adults"
                        min="1"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="number"
                        id="children"
                        v-model.number="children"
                        min="0"
                    />
                </div>
                <button type="submit">Search</button>
            </form>
        </div>
    </div>
    <div class="container">
        <div class="header">
            <div class="search-box">
                <p>Search by property name</p>
                <div class="search">
                    <input type="text" placeholder="eg. Ha Noi" />
                    <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
                                stroke="#4F4F4F"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                            <path
                                d="M17.5 17.5L13.875 13.875"
                                stroke="#4F4F4F"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </span>
                </div>
            </div>
            <div class="result-search">
                <div class="left">
                    <p>Ha Noi: 4 search results found</p>
                    <div class="options">
                        <button>Our top picks</button>
                        <button>Hotel and apartments</button>
                        <button>Resort</button>
                    </div>
                </div>
                <div class="right">
                    <div class="sort-dropdown">
                        <label class="sort-label">Sort by</label>
                        <div class="select-box">
                            <select>
                                <option>Recommended</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                                <option>Newest</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="body">
        <div class="filter">
            <h3 class="title">filter-by</h3>
            <div class="filter-panel">
                <!-- Budget -->
                <div class="filter-section">
                    <div class="section-title">Your budget per day</div>
                    <div class="section-body">
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">$ 0 - $ 200</span>
                            <span class="count">200</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">$ 200 - $ 500</span>
                            <span class="count">100</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">$ 500 - $ 1,000</span>
                            <span class="count">15</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">$ 1,000 - $ 2,000</span>
                            <span class="count">12</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">$ 2,000 - $ 5,000</span>
                            <span class="count">230</span>
                        </label>
                        <div class="toggle-row">
                            <span>Set your own budget</span>
                            <label class="switch">
                                <input type="checkbox" />
                                <span class="slider"></span>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Rating -->
                <div class="filter-section">
                    <div class="section-title">Rating</div>
                    <div class="section-body">
                        <p class="rating-caption">
                            Show only ratings more than
                        </p>
                        <div class="rating-stars">
                            <button>1 ★</button>
                            <button>2 ★</button>
                            <button>3 ★</button>
                            <button>4 ★</button>
                            <button>5 ★</button>
                        </div>
                    </div>
                </div>

                <!-- Popular Filters -->
                <div class="filter-section">
                    <div class="section-title">Popular Filters</div>
                    <div class="section-body">
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">Free WiFi</span>
                            <span class="count">200</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">Spa</span>
                            <span class="count">100</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">Pool</span>
                            <span class="count">15</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">Buffet</span>
                            <span class="count">12</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">Laundry service</span>
                            <span class="count">230</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">Exchange money</span>
                            <span class="count">12</span>
                        </label>
                    </div>
                </div>

                <!-- Activities -->
                <div class="filter-section">
                    <div class="section-title">Activities</div>
                    <div class="section-body">
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">Hoan Kiem Lake</span>
                            <span class="count">2.5 km</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">Temple of Literature</span>
                            <span class="count">6 km</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text"
                                >Ho Chi Minh Mausoleum</span
                            >
                            <span class="count">3.6 km</span>
                        </label>
                        <label class="filter-row">
                            <input type="checkbox" />
                            <span class="label-text">Old Quarter</span>
                            <span class="count">2 km</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="hotel-list">
            <template v-for="i in 4">
                <router-link :to="{ name: 'hotelDetail', params: { id: i } }">
                    <div class="hotel-card">
                        <div class="hotel-img">
                            <img
                                src="@/assets/images/hotel.png"
                                alt="Hotel du Parc Hanoi"
                            />
                        </div>

                        <div class="hotel-info">
                            <h3 class="hotel-name">Hotel du Parc Hanoi</h3>

                            <div class="rating">
                                <span class="stars">★★★★★</span>
                                <span class="score">5</span>
                                <span class="reviews">(2 Reviews)</span>
                            </div>

                            <p class="description">
                                Hôtel du Parc Hanoi is a 5-star hotel blending
                                Vietnamese charm with Japanese elegance, located
                                near Hanoi’s Old Quarter. It offers luxurious
                                rooms, fine dining, and modern amenities in a
                                peaceful setting.
                            </p>

                            <div class="hotel-footer">
                                <button class="availability-btn">
                                    See availability
                                </button>

                                <div class="price-info">
                                    <div class="discount-badge">15% off</div>
                                    <div class="price-breakdown">
                                        <div class="stay-info">
                                            1 room 2 days
                                        </div>
                                        <div class="price">
                                            <span class="original">$1,400</span>
                                            <span class="current">$1,200</span>
                                        </div>
                                        <div class="tax-note">
                                            Includes taxes and fees
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/bookingHotel.scss';
</style>
