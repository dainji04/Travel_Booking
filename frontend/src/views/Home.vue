<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import BlogsList from '@/components/BlogsList.vue';
import TicketList from '@/components/TicketList.vue';

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
const imagesSlide = [
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
        activeIndex.value < imagesSlide.length - 1 ? activeIndex.value + 1 : 0;
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

const tourTipsImageLeft = ref([]);
const tourTipsImageRight = ref([]);
const tourTipsContentLeft = ref([]);
const tourTipsContentRight = ref([]);

onMounted(() => {
    startAutoPlay();
    const gsapAnimate = () => {
        const ImageLeft = tourTipsImageLeft.value;
        const imageRight = tourTipsImageRight.value;
        const contentLeft = tourTipsContentLeft.value;
        const contentRight = tourTipsContentRight.value;

        gsap.from(ImageLeft, {
            scrollTrigger: {
                trigger: ImageLeft,
                start: 'top bottom',
                toggleActions: 'restart none none none',
            },
            x: -100,
            opacity: 0,
            duration: 2,
        });

        gsap.to(ImageLeft, {
            scrollTrigger: {
                trigger: ImageLeft,
                start: 'top bottom',
                toggleActions: 'restart none none none',
            },
            delay: 0.5,
            x: 0,
            opacity: 1,
            duration: 2,
        });

        gsap.from(imageRight, {
            scrollTrigger: {
                trigger: imageRight,
                start: 'top bottom',
                toggleActions: 'restart none none none',
            },
            x: 100,
            opacity: 0,
            duration: 2,
        });

        gsap.to(imageRight, {
            scrollTrigger: {
                trigger: imageRight,
                start: 'top bottom',
                toggleActions: 'restart none none none',
            },
            delay: 0.5,
            x: 0,
            opacity: 1,
            duration: 2,
        });

        gsap.from(contentLeft, {
            scrollTrigger: {
                trigger: contentLeft,
                start: 'top bottom',
                toggleActions: 'restart none none none',
            },
            x: -100,
            opacity: 0,
            duration: 2,
        });

        gsap.to(contentLeft, {
            scrollTrigger: {
                trigger: contentLeft,
                start: 'top bottom',
                toggleActions: 'restart none none none',
            },
            delay: 1,
            x: 0,
            opacity: 1,
            duration: 2,
        });

        gsap.from(contentRight, {
            scrollTrigger: {
                trigger: contentRight,
                start: 'top bottom',
                toggleActions: 'restart none none none',
            },
            x: 100,
            opacity: 0,
            duration: 2,
        });

        gsap.to(contentRight, {
            scrollTrigger: {
                trigger: contentRight,
                start: 'top bottom',
                toggleActions: 'restart none none none',
            },
            delay: 1,
            x: 0,
            opacity: 1,
            duration: 2,
        });
    };
    gsapAnimate();
});

// const load = setTimeout(() => {
//     loading.value = false;
// }, 4000);
</script>

<template>
    <div class="home">
        <!-- slide -->
        <div class="container-slide">
            <div class="slide-list" ref="slider" :style="sliderStyle">
                <div
                    class="slide"
                    v-for="(image, index) in imagesSlide"
                    :key="index"
                >
                    <div class="slide__left">
                        <h1 class="slide__heading">get started now</h1>
                        <h2 class="slide__sub-heading">History and culture</h2>
                        <p class="slide__description">
                            {{ image.description }}
                        </p>
                        <button class="slide__button button-primary">
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
                    v-for="(image, index) in imagesSlide"
                    :key="index"
                    class="slide__number button-primary"
                    @click="goToSlide(index)"
                    :class="{ active: index === activeIndex }"
                >
                    <p class="slide__number-text">{{ index + 1 }}</p>
                </div>
            </div>
        </div>
        <!-- tour-tips -->
        <div class="tour-tips">
            <div class="list-icon-bg">
                <img
                    loading="lazy"
                    src="@/assets/images/icon-bg-circle.gif"
                    class="tour-tips__icon-bg tour-tips__icon-bg--circle"
                    alt=""
                />

                <img
                    loading="lazy"
                    src="@/assets/fonts/icon-bg-dots.svg"
                    class="tour-tips__icon-bg tour-tips__icon-bg--dots"
                    alt=""
                />
                <img
                    loading="lazy"
                    src="@/assets/images/icon-bg-shape.gif"
                    class="tour-tips__icon-bg tour-tips__icon-bg--shape"
                    alt=""
                />
            </div>
            <div class="tour-tips__header">
                <h1 class="heading">tips</h1>
                <h2 class="tour-tips__sub-heading subheading">
                    Great Tips to Make Your Trip Great
                </h2>
            </div>
            <div class="tour-tips__list">
                <div class="tour-tips__box">
                    <div
                        class="tour-tips__image tour-tips__image--left"
                        style="
                            background: url(src/assets/images/tour-tips1.png)
                                center/cover no-repeat;
                        "
                        ref="tourTipsImageLeft"
                    >
                        <button
                            class="tour-tips__camera-btn tour-tips__camera-btn--left"
                        >
                            <img
                                loading="lazy"
                                src="@/assets/fonts/camera.svg"
                                alt=""
                            />Camera
                        </button>
                    </div>
                    <div
                        class="tour-tips__content tour-tips__content--right"
                        ref="tourTipsContentRight"
                    >
                        <div class="tour-tips__title-box">
                            <img
                                loading="lazy"
                                src="@/assets/fonts/calendar.svg"
                                alt=""
                            />
                            <h3 class="tour-tips__title">April 22, 2025</h3>
                        </div>
                        <h3 class="tour-tips__subtitle">
                            Top 10 things to do when coming to Hoi An
                        </h3>
                        <p class="tour-tips__description">
                            Hoi An's Ancient Town is a well preserved historical
                            site, known for its blend of traditional Vietnamese,
                            Chinese, and Japanese architecture. The charming
                            streets, lantern-lit evenings, and vibrant markets
                            make it a UNESCO World Heritage gem.
                        </p>
                        <button class="tour-tips__button button-primary">
                            read more
                        </button>
                    </div>
                </div>
                <div class="tour-tips__box">
                    <div
                        class="tour-tips__image tour-tips__image--right"
                        style="
                            background: url(src/assets/images/tour-tips2.png)
                                center/cover no-repeat;
                        "
                        ref="tourTipsImageRight"
                    >
                        <button
                            class="tour-tips__camera-btn tour-tips__camera-btn--right"
                        >
                            <img
                                loading="lazy"
                                src="@/assets/fonts/camera.svg"
                                alt=""
                            />Camera
                        </button>
                    </div>
                    <div
                        class="tour-tips__content tour-tips__content--left"
                        ref="tourTipsContentLeft"
                    >
                        <div class="tour-tips__title-box">
                            <img
                                loading="lazy"
                                src="@/assets/fonts/calendar.svg"
                                alt=""
                            />
                            <h3 class="tour-tips__title">July 31, 2025</h3>
                        </div>
                        <h3 class="tour-tips__subtitle">
                            See the earliest sunrise in Vietnam at Phu Yen
                        </h3>
                        <p class="tour-tips__description">
                            The earliest sunrise in Vietnam can be seen at Cape
                            Dai Lanh in Phu Yen, where the first rays of
                            sunlight light up the ocean. This picturesque spot
                            offers a serene and breathtaking start to the day.
                        </p>
                        <button class="tour-tips__button button-primary">
                            read more
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- ticket -->
        <TicketList />
        <!-- cities -->
        <div class="cities">
            <div class="cities__header">
                <h1 class="heading">beautiful cities with rich culture</h1>
                <h2 class="cities__subheading">
                    If you are passionate about exploring unique destinations
                    and experiencing new cultures, we will take you to the most
                    amazing cities on this memorable journey.
                </h2>
            </div>
            <div class="cities__box">
                <div class="cities__image">
                    <button class="cities__image-btn">
                        <img
                            loading="lazy"
                            src="@/assets/fonts/circle-play.svg"
                            alt=""
                        />
                        Video
                    </button>
                </div>
            </div>
            <div class="cities__list-options">
                <div class="cities__option">
                    <div class="cities__option__icon">
                        <img
                            loading="lazy"
                            src="@/assets/fonts/star.svg"
                            alt=""
                        />
                    </div>
                    <div class="cities__option__content">
                        <h1 class="cities__option__heading">
                            speacial activies
                        </h1>
                        <p class="cities__option__description">
                            Special activities offer a different and unique
                            experience
                        </p>
                    </div>
                </div>
                <div class="cities__option">
                    <div class="cities__option__icon">
                        <img
                            loading="lazy"
                            src="@/assets/fonts/sign-post.svg"
                            alt=""
                        />
                    </div>
                    <div class="cities__option__content">
                        <h1 class="cities__option__heading">tour guide</h1>
                        <p class="cities__option__description">
                            Friendly and enthusiastic tour guide
                        </p>
                    </div>
                </div>
                <div class="cities__option">
                    <div class="cities__option__icon">
                        <img
                            loading="lazy"
                            src="@/assets/fonts/card.svg"
                            alt=""
                        />
                    </div>
                    <div class="cities__option__content">
                        <h1 class="cities__option__heading">booking</h1>
                        <p class="cities__option__description">
                            Convenient car rental and hotel booking system
                        </p>
                    </div>
                </div>
                <div class="cities__option">
                    <div class="cities__option__icon">
                        <img
                            loading="lazy"
                            src="@/assets/fonts/locate2.svg"
                            alt=""
                        />
                    </div>
                    <div class="cities__option__content">
                        <h1 class="cities__option__heading">
                            location management
                        </h1>
                        <p class="cities__option__description">
                            Commitment to the booked tour
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- advertisement -->
        <div class="advertisement">
            <div class="advertisement__left">
                <h3 class="advertisement__title heading">Go & discover</h3>
                <h1 class="advertisement__heading">special offer</h1>
                <p class="advertisement__description">
                    Discover unique special offers and exciting savings just for
                    you.
                </p>
                <button class="advertisement__button button-primary">
                    get voucher
                </button>
            </div>
            <div class="advertisement__right">
                <img
                    loading="lazy"
                    src="@/assets/images/advertisement-percent-sales.png"
                    alt=""
                />
            </div>
            <div class="advertisement__bg-icon">
                <img
                    loading="lazy"
                    src="@/assets/fonts/icon-bg-line-circle.svg"
                    alt=""
                />
            </div>
        </div>
        <BlogsList />
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/home.scss';

.slide-list {
    display: flex;
    width: 100%;
}
</style>
