<script setup lang="ts">
import { ref } from 'vue';
// import { useRoute } from 'vue-router';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CheckoutPopup from '@/components/CheckoutPopup.vue';

// const router = useRoute();
// const name = router.params.slug as string;

const showPopUp = ref(false);

const tour = ref({
    name: 'ha noi',
    description:
        'Hanoi is the capital city of Vietnam, located in the northern part of the country. It is known for its rich history, ancient temples, and vibrant culture. The city blends traditional Vietnamese architecture with French colonial influences. Famous landmarks include Hoan Kiem Lake, the Old Quarter, and the Ho Chi Minh Mausoleum. Hanoi is a lively, charming destination for both tourists and locals.',
    thumbnail:
        'https://cdn-media.sforum.vn/storage/app/media/anh-ho-hoan-kiem-16.jpg',
    detailImg: [
        'https://cdn.pixabay.com/photo/2021/08/11/03/19/incense-sticks-6537298_1280.jpg',
        'https://cdn.pixabay.com/photo/2020/04/28/13/21/landscape-5104510_1280.jpg',
        'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1719955783083-6a0bd66c5f75?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1521993117367-b7f70ccd029d?q=80&w=2040&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    duration: 7,
    overview:
        "Hanoi, the thousand-year-old capital of Vietnam, is a must-visit destination for those looking to explore the country’s rich history, vibrant culture, unique cuisine, and dynamic daily life. In this 7-day, 6-night journey, you'll experience the charm of old quarters, beautiful natural landscapes, and cultural landmarks that tell the story of Vietnam.",
    itinerary: [
        {
            day: 1,
            title: 'Arrival in Hanoi – Hotel Check-in & Free Time',
            activity: [
                'Pick-up at Noi Bai International Airport',
                'Transfer to hotel for check-in and rest',
                'Evening: Explore Hanoi’s Old Quarter and try iconic street food such as pho, bun cha, and fried spring rolls',
            ],
        },
        {
            day: 2,
            title: 'Historical & Cultural Highlights of Hanoi',
            activity: [
                'Visit Ho Chi Minh Mausoleum, Presidential Palace, and One Pillar Pagoda',
                'Explore the Temple of Literature – Vietnam’s first university',
                'Walk around Hoan Kiem Lake and visit Ngoc Son Temple',
                'Optional: Cyclo (rickshaw) tour around the Old Quarter',
                'Evening: Watch a traditional water puppet show',
            ],
        },
        {
            day: 3,
            title: 'Duong Lam Ancient Village & Son Tay Citadel',
            activity: [
                'Travel to Duong Lam – a 300-year-old village with ancient houses',
                'Visit Mong Phu communal house, Mia Pagoda',
                'Explore Son Tay Ancient Citadel',
                'Return to Hanoi in the evening',
            ],
        },
        {
            day: 4,
            title: 'Day Trip to Ninh Binh – Trang An & Bai Dinh Pagoda',
            activity: [
                'Travel to Ninh Binh (approx. 2 hrs)',
                'Visit Bai Dinh Pagoda – the largest Buddhist temple complex in Southeast Asia',
                'Take a boat ride through the caves of Trang An – a UNESCO World Heritage site',
                'Return to Hanoi for overnight',
            ],
        },
        {
            day: 5,
            title: 'Museums & Artistic Exploration',
            activity: [
                'Visit the Vietnam Museum of Ethnology',
                'Enjoy contemporary art at Manzi Art Space or VICAS Art Studio',
                'Afternoon: Sip on famous egg coffee or coconut coffee at a classic Hanoi café',
                'Evening: Free time for shopping or exploring local markets',
            ],
        },
        {
            day: 6,
            title: 'Green Hanoi – Parks, Lakes & Culture',
            activity: [
                'Morning picnic or relaxing walk at Yen So Park – Hanoi’s largest park',
                'Visit Tran Quoc Pagoda and West Lake area',
                'Enjoy a traditional Vietnamese music performance in the evening',
            ],
        },
        {
            day: 7,
            title: 'Shopping & Departure',
            activity: [
                'Free time for shopping at Dong Xuan Market, Lotte Center, or Aeon Mall',
                'Transfer to the airport for your departure flight',
                'End of tour',
            ],
        },
    ],
    costIncludes: [
        'Accommodation at 4-star hotel (or upgraded upon request)',
        'Airport pick-up and drop-off',
        'Transportation during the tour',
        'Entrance fees and activity tickets',
        'English-speaking tour guide',
        'Meals as per itinerary',
        'Travel insurance',
    ],
    costExcludes: [
        'International airfare',
        'Personal expenses (laundry, drinks, tips, etc.)',
        'Optional activities not listed in the itinerary',
        'Visa fees (if applicable)',
        'Gratuities for guide and driver (optional but appreciated)',
    ],
    specialOffer:
        'Free professional photo session at Hoan Kiem Lake for groups of 4+. Visa and flight booking support available for international guests.',
});

const detailTour = {
    priceVietnam: '14,400,000 VND',
    priceUSD: '600$',
    personNum: 1,
    accommodation: '4 Stars Hotels',
    transportation: 'Airlines Bus Motorbike',
    bestSeason: 'July August September',
    tourAvailability: 'Available',
    meals: 'All meals during the trip',
    language: 'Vietnamese English',
    walkingHours: '2-3 Hours',
    wifi: 'Available',
    age: '12 - 65 year Olds',
};

const progressCircle = ref<any>(null);
const progressContent = ref<any>(null);
const onAutoplayTimeLeft = (s: SwiperType, time: number, progress: number) => {
    if (progressCircle.value) {
        progressCircle.value.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.value) {
        progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
    }
};

const modules = [Autoplay, Navigation];
</script>

<template>
    <div class="detail-tour">
        <div class="capital">
            <h1 class="subheading">{{ tour.name }} - capital of vietnam</h1>
            <div class="capital__container">
                <div class="capital-left">
                    <img :src="tour.thumbnail" alt="" />
                    <div class="capital__day-container">
                        <div class="capital__day-top">{{ tour.duration }}</div>
                        <div class="capital__day-bottom">days</div>
                    </div>
                </div>
                <div class="capital-right">
                    <h1 class="heading">about {{ tour.name }}</h1>
                    <p>
                        Hanoi is the capital city of Vietnam, located in the
                        northern part of the country. It is known for its rich
                        history, ancient temples, and vibrant culture. The city
                        blends traditional Vietnamese architecture with French
                        colonial influences. Famous landmarks include Hoan Kiem
                        Lake, the Old Quarter, and the Ho Chi Minh Mausoleum.
                        Hanoi is a lively, charming destination for both
                        tourists and locals.
                    </p>
                </div>
            </div>
        </div>
        <div class="slide">
            <h1 class="subheading">Tour details</h1>
            <swiper
                :rewind="true"
                :centeredSlides="true"
                :navigation="true"
                :modules="modules"
                :autoplay="{
                    delay: 5000,
                    disableOnInteraction: false,
                }"
                @autoplayTimeLeft="onAutoplayTimeLeft"
                class="mySwiper"
            >
                <template v-for="img in tour.detailImg" :key="img">
                    <swiper-slide>
                        <img :src="img" alt="Tour Image" />
                    </swiper-slide>
                </template>
                <template #container-end>
                    <div class="autoplay-progress">
                        <svg viewBox="0 0 48 48" ref="progressCircle">
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref="progressContent"></span>
                    </div>
                </template>
            </swiper>
        </div>
        <div class="main">
            <div class="main__pagination pagination">
                <ul class="pagination__list">
                    <li class="pagination__item">
                        <a href="#overview">overview</a>
                    </li>
                    <li class="pagination__item">
                        <a href="#itinerary">Itinerary</a>
                    </li>
                    <li class="pagination__item"><a href="#cost">cost</a></li>
                    <li class="pagination__item">
                        <a href="#specialOffer">special offer</a>
                    </li>
                </ul>
                <hr class="pagination__divider" />
            </div>
            <div class="main__container">
                <div class="main__left">
                    <!-- Overview Block -->
                    <div id="overview" class="main__overview">
                        <h1 class="main__heading heading">overview</h1>
                        <p>{{ tour.overview }}</p>
                    </div>

                    <!-- Itinerary Block -->
                    <div id="itinerary" class="main__itinerary">
                        <h1 class="main__heading heading">itinerary</h1>
                        <div class="main__itinerary-list-item">
                            <template
                                v-for="item in tour.itinerary"
                                :key="item.day"
                            >
                                <div class="main__itinerary-item">
                                    <p>Day {{ item.day }}: {{ item.title }}</p>
                                    <ul class="main__activity-list">
                                        <template
                                            v-for="activity in item.activity"
                                        >
                                            <li class="main__activity-item">
                                                {{ activity }}
                                            </li>
                                        </template>
                                    </ul>
                                    <hr class="main__itinerary-divider" />
                                </div>
                            </template>
                        </div>
                    </div>

                    <!-- Cost Block -->
                    <div id="cost" class="main__cost">
                        <h1 class="main__heading heading">cost</h1>
                        <div class="main__cost-section">
                            <h3 class="main__subheading subheading">
                                the cost includes
                            </h3>
                            <ul class="main__includes-list">
                                <template
                                    v-for="item in tour.costIncludes"
                                    :key="item"
                                >
                                    <li class="main__list-item">{{ item }}</li>
                                </template>
                            </ul>
                        </div>
                        <div class="main__cost-section">
                            <h3 class="main__subheading subheading">
                                the cost excludes
                            </h3>
                            <ul class="main__excludes-list">
                                <template
                                    v-for="item in tour.costExcludes"
                                    :key="item"
                                >
                                    <li class="main__list-item">{{ item }}</li>
                                </template>
                            </ul>
                        </div>
                    </div>

                    <!-- Special Offer Block -->
                    <div id="specialOffer" class="main__special-offer">
                        <h1 class="main__heading heading">special offer</h1>
                        <p>{{ tour.specialOffer }}</p>
                    </div>
                </div>

                <!-- Right Sidebar -->
                <div class="main__right">
                    <div class="main__price-outside">
                        <div class="main__price-inside">
                            <div class="main__price-top">
                                <h3>from</h3>
                                <h3>
                                    {{ detailTour.priceUSD }} or
                                    {{ detailTour.priceVietnam }}
                                </h3>
                                <p>for {{ detailTour.personNum }} Person</p>
                            </div>
                            <hr class="main__divider" />
                            <div class="main__price-bottom">
                                <button
                                    @click="showPopUp = true"
                                    class="main__button button-primary"
                                >
                                    check now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="main__detail">
                        <div class="accommodation main__detail-item">
                            <img src="@/assets/fonts/hotel-star.svg" alt="" />
                            <div>
                                <h3>Accommodation</h3>
                                <p>{{ detailTour.accommodation }}</p>
                            </div>
                        </div>
                        <div class="transportation main__detail-item">
                            <img src="@/assets/fonts/airport.svg" alt="" />
                            <div>
                                <h3>Transportation</h3>
                                <p>{{ detailTour.transportation }}</p>
                            </div>
                        </div>
                        <div class="best-season main__detail-item">
                            <img src="@/assets/fonts/rain-cloud.svg" alt="" />
                            <div>
                                <h3>Best Season</h3>
                                <p>{{ detailTour.bestSeason }}</p>
                            </div>
                        </div>
                        <div class="tour-availability main__detail-item">
                            <img
                                src="@/assets/fonts/check-circle-orange-2.svg"
                                alt=""
                            />
                            <div>
                                <h3>tour availability</h3>
                                <p>{{ detailTour.tourAvailability }}</p>
                            </div>
                        </div>
                        <div class="meals main__detail-item">
                            <img src="@/assets/fonts/meals.svg" alt="" />
                            <div>
                                <h3>meals</h3>
                                <p>{{ detailTour.meals }}</p>
                            </div>
                        </div>
                        <div class="languages main__detail-item">
                            <img src="@/assets/fonts/language.svg" alt="" />
                            <div>
                                <h3>language</h3>
                                <p>{{ detailTour.language }}</p>
                            </div>
                        </div>
                        <div class="walking-hours main__detail-item">
                            <img src="@/assets/fonts/walking.svg" alt="" />
                            <div>
                                <h3>walking hours</h3>
                                <p>{{ detailTour.walkingHours }}</p>
                            </div>
                        </div>
                        <div class="wifi main__detail-item">
                            <img src="@/assets/fonts/wifi.svg" alt="" />
                            <div>
                                <h3>wifi</h3>
                                <p>{{ detailTour.wifi }}</p>
                            </div>
                        </div>
                        <div class="age main__detail-item">
                            <img src="@/assets/fonts/customer.svg" alt="" />
                            <div>
                                <h3>age</h3>
                                <p>{{ detailTour.age }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <checkout-popup v-if="showPopUp" @close="showPopUp = false" />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/tourDetail.scss';
</style>
