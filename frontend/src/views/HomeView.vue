<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

import { gsap } from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// import Loading from '@/components/loadingPages.vue';
// const loading = ref(true);

const tours = [
    {
        img: 'src/assets/images/tour-tips1.png',
        title: 'Top 10 things to do when coming to Hoi An',
        calendar: 'April 22, 2025',
        description:
            "Hoi An's Ancient Town is a well preserved historical site, known for its blend of traditional Vietnamese, Chinese, and Japanese architecture. The charming streets, lantern-lit evenings, and vibrant markets make it a UNESCO World Heritage gem.",
    },
    {
        img: 'src/assets/images/tour-tips2.png',
        title: 'See the earliest sunrise in Vietnam at Phu Yen',
        calendar: 'July 31, 2025',
        description:
            'The earliest sunrise in Vietnam can be seen at Cape Dai Lanh in Phu Yen, where the first rays of sunlight light up the ocean. This picturesque spot offers a serene and breathtaking start to the day.',
    },
];

const tourTicket = [
    {
        img: 'src/assets/images/tour-ticket1.png',
        title: 'Hue tour',
        locate: 'Hue city',
        guide: 'Mr.Tuan',
        times: '3 days 2 nights',
        dollarsPrice: '2000$',
        VietNamDongPrice: '48,000,000VND',
    },
    {
        img: 'src/assets/images/tour-ticket1.png',
        title: 'Hue tour',
        locate: 'Hue city',
        guide: 'Mr.Tuan',
        times: '3 days 2 nights',
        dollarsPrice: '2000$',
        VietNamDongPrice: '48,000,000VND',
    },
    {
        img: 'src/assets/images/tour-ticket1.png',
        title: 'Hue tour',
        locate: 'Hue city',
        guide: 'Mr.Tuan',
        times: '3 days 2 nights',
        dollarsPrice: '2000$',
        VietNamDongPrice: '48,000,000VND',
    },
];

const images = [
    {
        id: 1,
        image1: 'src/assets/images/image1.jpg',
        image2: 'src/assets/images/image2.jpg',
        description:
            'Vietnam has a rich history, shaped by centuries of dynasties, wars, and foreign influences. Its culture is a blend of indigenous traditions and external elements, creating a unique identity in art, music, and cuisine. The country’s festivals, literature, and ancient architecture reflect its deep cultural heritage.',
    },
    {
        id: 2,
        image1: 'src/assets/images/image3.jpg',
        image2: 'src/assets/images/image4.jpg',
        description:
            'Vietnam has a rich history, shaped by centuries of dynasties, wars, and foreign influences. Its culture is a blend of indigenous traditions and external elements, creating a unique identity in art, music, and cuisine. The country’s festivals, literature, and ancient architecture reflect its deep cultural heritage.',
    },
    {
        id: 3,
        image1: 'https://www.winetraveler.com/wp-content/uploads/2022/06/best-wine-travel-destinations-to-visit.jpg',
        image2: 'https://epicureandculture.com/wp-content/uploads/2015/11/rsz_machu_picchu.jpg',
        description:
            'Vietnam is a land of stunning landscapes, from misty mountains to beautiful beaches. Its rich culture and vibrant cities offer a perfect blend of nature and history.',
    },
    {
        id: 4,
        image1: 'src/assets/images/image5.jpg',
        image2: 'https://epicureandculture.com/wp-content/uploads/2015/11/rsz_machu_picchu.jpg',
        description:
            'Vietnam is a land of stunning landscapes, from misty mountains to beautiful beaches. Its rich culture and vibrant cities offer a perfect blend of nature and history.',
    },
];
const activeIndex = ref(0);
const slider = ref(null);
let autoPlay: any = null;

// Tính toán style cho slider
const sliderStyle = computed(() => ({
    transform: `translateX(-${activeIndex.value * 100}%)`,
    transition: 'transform 0.5s ease-in-out',
}));

// Chuyển slide tiếp theo
const nextSlide = () => {
    activeIndex.value =
        activeIndex.value < images.length - 1 ? activeIndex.value + 1 : 0;
};

// Nhảy đến slide cụ thể
const goToSlide = (index: number) => {
    activeIndex.value = index;
    resetAutoPlay();
};

// Xử lý tự động chạy
const startAutoPlay = () => {
    autoPlay = setInterval(nextSlide, 3000);
};

const resetAutoPlay = () => {
    clearInterval(autoPlay);
    startAutoPlay();
};

const gsapAnimate = () => {
    const ImageLeft = tourTipsImageLeft.value[0];
    const imageRight = tourTipsImageRight.value[0];
    const contentLeft = tourTipsContentLeft.value[0];
    const contentRight = tourTipsContentRight.value[0];

    gsap.from(ImageLeft, {
        scrollTrigger: {
            trigger: ImageLeft,
            start: 'top 80%',
            toggleActions: 'restart reverse none none',
        },
        x: -100,
        opacity: 0,
        duration: 3,
    });

    gsap.to(ImageLeft, {
        scrollTrigger: {
            trigger: imageRight,
            start: 'top bottom',
            markers: true,
            toggleActions: 'restart reverse none none',
        },
        x: 0,
        opacity: 1,
        duration: 3,
    });

    gsap.from(imageRight, {
        scrollTrigger: {
            trigger: imageRight,
            start: 'top 80%',
            toggleActions: 'restart reverse none none',
        },
        x: 100,
        opacity: 0,
        duration: 3,
    });

    gsap.to(imageRight, {
        scrollTrigger: {
            trigger: contentLeft,
            start: 'top bottom',
            toggleActions: 'restart reverse none none',
        },
        x: 0,
        opacity: 1,
        duration: 3,
    });

    gsap.from(contentLeft, {
        scrollTrigger: {
            trigger: contentLeft,
            start: 'top 80%',
            toggleActions: 'restart reverse none none',
        },
        x: -100,
        opacity: 0,
        duration: 3,
    });

    gsap.to(contentLeft, {
        scrollTrigger: {
            trigger: contentRight,
            start: 'top bottom',
            toggleActions: 'restart reverse none none',
        },
        delay: 1,
        x: 0,
        opacity: 1,
        duration: 3,
    });

    gsap.from(contentRight, {
        scrollTrigger: {
            trigger: contentRight,
            start: 'top 80%',
            toggleActions: 'restart reverse none none',
        },
        x: 100,
        opacity: 0,
        duration: 3,
    });

    gsap.to(contentRight, {
        scrollTrigger: {
            trigger: contentRight,
            start: 'top bottom',
            toggleActions: 'restart reverse none none',
        },
        delay: 1,
        x: 0,
        opacity: 1,
        duration: 3,
    });
};

const tourTipsImageLeft = ref(null);
const tourTipsImageRight = ref(null);
const tourTipsContentLeft = ref(null);
const tourTipsContentRight = ref(null);
onMounted(() => {
    startAutoPlay();
    gsapAnimate();
});

// const load = setTimeout(() => {
//     loading.value = false;
// }, 4000);
</script>

<template>
    <div class="home">
        <div class="logo">
            <div class="logo__box">
                <img class="logo__image" src="@/assets/fonts/logo.svg" alt="" />
            </div>
        </div>
        <div class="container-slide">
            <div class="slide-list" ref="slider" :style="sliderStyle">
                <div
                    class="slide"
                    v-for="(image, index) in images"
                    :key="index"
                >
                    <div class="slide__left">
                        <h1 class="slide__heading">get started now</h1>
                        <h2 class="slide__sub-heading">History and culture</h2>
                        <p class="slide__description">
                            {{ image.description }}
                        </p>
                        <button class="slide__button">
                            <p>Booking now</p>
                        </button>
                    </div>
                    <div class="slide__right">
                        <div
                            class="slide__box slide__box1"
                            :style="{
                                background: `url(${image.image1}) center/cover no-repeat`,
                            }"
                        ></div>
                        <div
                            class="slide__box slide__box2"
                            :style="{
                                background: `url(${image.image2}) center/cover no-repeat`,
                            }"
                        ></div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="slide__pagination">
                <div
                    v-for="(_, index) in images"
                    :key="index"
                    class="slide__number"
                    @click="goToSlide(index)"
                    :class="{ active: index === activeIndex }"
                >
                    <p class="slide__number-text">{{ index + 1 }}</p>
                </div>
            </div>
        </div>
        <div class="tour-tips">
            <h1 class="tour-tips__heading">tips</h1>
            <h2 class="tour-tips__sub-heading">
                Great Tips to Make Your Trip Great
            </h2>
            <div class="tour-tips__list">
                <template v-for="(tour, index) in tours">
                    <div class="tour-tips__box">
                        <div
                            class="tour-tips__image"
                            :class="[
                                index % 2 == 0
                                    ? 'tour-tips__image--left'
                                    : 'tour-tips__image--right',
                            ]"
                            :style="{
                                background: `url(${tour.img}) center/cover no-repeat`,
                            }"
                            :ref="
                                index % 2 === 0
                                    ? 'tourTipsImageLeft'
                                    : 'tourTipsImageRight'
                            "
                        ></div>
                        <div
                            class="tour-tips__content"
                            :class="[
                                index % 2 == 0
                                    ? 'tour-tips__content--right'
                                    : 'tour-tips__content--left',
                            ]"
                            :ref="
                                index % 2 == 0
                                    ? 'tourTipsContentRight'
                                    : 'tourTipsContentLeft'
                            "
                        >
                            <div class="tour-tips__title-box">
                                <img src="@/assets/fonts/calendar.svg" alt="" />
                                <h3 class="tour-tips__title">
                                    {{ tour.calendar }}
                                </h3>
                            </div>
                            <h3 class="tour-tips__subtitle">
                                {{ tour.title }}
                            </h3>
                            <p class="tour-tips__description">
                                {{ tour.description }}
                            </p>
                            <button class="tour-tips__button">read more</button>
                        </div>
                    </div>
                </template>
            </div>
            <h2 class="tour-tips__sub-heading">
                Great Tips to Make Your Trip Great
            </h2>
            <h3 class="tour-tips__footer-text">Great tours</h3>
        </div>
        <div class="ticket">
            <template v-for="ticket in tourTicket">
                <div class="ticket__item">
                    <div
                        class="ticket__image"
                        :style="{
                            background: `url(${ticket.img}) lightgray 50% / cover no-repeat`,
                        }"
                    ></div>
                    <div class="ticket__content">
                        <h1 class="ticket__title">{{ ticket.title }}</h1>
                        <div class="ticket__box">
                            <div class="ticket__information">
                                <div class="ticket__info-item ticket__location">
                                    <img
                                        src="@/assets/fonts/location.svg"
                                        alt=""
                                    />
                                    <p class="ticket__text">
                                        {{ ticket.locate }}
                                    </p>
                                </div>
                                <div class="ticket__info-item ticket__user">
                                    <img src="@/assets/fonts/user.svg" alt="" />
                                    <p class="ticket__text">
                                        {{ ticket.guide }}
                                    </p>
                                </div>
                                <div class="ticket__info-item ticket__times">
                                    <img
                                        src="@/assets/fonts/clock.svg"
                                        alt=""
                                    />
                                    <p class="ticket__text">
                                        {{ ticket.times }}
                                    </p>
                                </div>
                            </div>
                            <span class="ticket__line"></span>
                            <div class="ticket__price">
                                <p class="ticket__price-text">
                                    {{ ticket.dollarsPrice }}
                                </p>
                                <p class="ticket__price-text">OR</p>
                                <p class="ticket__price-text">
                                    {{ ticket.VietNamDongPrice }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="ticket__button-box">
                        <button class="ticket__button">Booking now</button>
                    </div>
                </div>
            </template>
            <div class="ticket__background">
                <img src="@/assets/fonts/footer-background-ticket.svg" alt="" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/scss/home.scss';

.slide-list {
    display: flex;
    width: 100%;
}
</style>
