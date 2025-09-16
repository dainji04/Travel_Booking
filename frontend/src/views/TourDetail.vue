<script setup lang="ts">
import { onMounted, ref } from 'vue';
// import { useRoute } from 'vue-router';

import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';

import 'swiper/css/navigation';

import { Autoplay, Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import CheckoutPopup from '@/components/CheckoutPopup.vue';

import type { Tour } from '@/types/tour';
import { tourStore } from '@/stores/tourStore';
import type { Itinerary } from '@/types/itinerary';

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

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const showPopUp = ref(false);

const tour = ref<Tour>();
const itinerary = ref<Itinerary[]>([]);
const useTourStore = tourStore();
const getTourItem = useTourStore.getTourItem;
const getListItinerary = useTourStore.getListItinerary;

onMounted(async () => {
    await getTourItem(props.id);
    tour.value = useTourStore.getTour;

    await getListItinerary(props.id);
    itinerary.value = useTourStore.getItinerary;
});

const calculatorDate = (startDate: any, endDate: any) => {
    if (!startDate || !endDate) {
        return 0;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return dayDiff + 1;
};

const calculatorMoney = (price: any) => {
    const priceVND = price * 24000;
    return `${priceVND.toLocaleString('vi-VN')} VND`;
};

// swiper
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
            <h1 class="subheading">{{ tour?.Name }} - capital of vietnam</h1>
            <div class="capital__container">
                <div class="capital-left">
                    <img :src="tour?.Thumbnail" alt="" />
                    <div class="capital__day-container">
                        <div class="capital__day-top">duration</div>
                        <div class="capital__day-bottom">
                            {{ calculatorDate(tour?.DayStart, tour?.DayEnd) }}
                            days
                        </div>
                    </div>
                </div>
                <div class="capital-right">
                    <h1 class="heading">about {{ tour?.Name }}</h1>
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
                <template v-for="img in tour?.Imgs" :key="img">
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
                        <p>{{ tour?.Overview }}</p>
                    </div>

                    <!-- Itinerary Block -->
                    <div id="itinerary" class="main__itinerary">
                        <h1 class="main__heading heading">itinerary</h1>
                        <div class="main__itinerary-list-item">
                            <template
                                v-for="(item, index) in itinerary"
                                :key="index"
                            >
                                <div class="main__itinerary-item">
                                    <p>Day {{ index + 1 }}: {{ item.Title }}</p>
                                    <ul class="main__activity-list">
                                        <template
                                            v-for="activity in item.Activities"
                                        >
                                            <li class="main__activity-item">
                                                {{ activity.Name }}
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
                                    v-for="item in tour?.Includes"
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
                                    v-for="item in tour?.Excludes"
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
                        <p>{{ tour?.Special }}</p>
                    </div>
                </div>

                <!-- Right Sidebar -->
                <div class="main__right">
                    <div class="main__price-outside">
                        <div class="main__price-inside">
                            <div class="main__price-top">
                                <h3>from</h3>
                                <h3>
                                    {{ tour?.Price }} or
                                    {{ calculatorMoney(tour?.Price) }}
                                </h3>
                                <p>for 7 Person</p>
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
    <checkout-popup
        v-if="showPopUp"
        :tour="tour?.Name"
        @close="showPopUp = false"
    />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/tourDetail.scss';
</style>
