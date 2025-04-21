<script setup lang="ts">
import { ref } from 'vue';

const tourTicket = [
    {
        img: 'src/assets/images/hueTicket.png',
        title: 'Hue tour',
        locate: 'Hue city',
        guide: 'Mr.Tuan',
        times: '7 days 6 nights',
        dollarsPrice: '600$',
        VietNamDongPrice: '14,400,000VND',
    },
    {
        img: 'src/assets/images/phuyenTicket.png',
        title: 'Phu Yen tour',
        locate: 'Tuy Hoa city',
        guide: 'Mr.Minh Quy',
        times: '3 days 2 nights',
        dollarsPrice: '400$',
        VietNamDongPrice: '9,600,000VND',
    },
    {
        img: 'src/assets/images/hanoiTicket.png',
        title: 'Hue tour',
        locate: 'Hue city',
        guide: 'Mr.Thanh Nhan',
        times: '7 days 6 nights',
        dollarsPrice: '500$',
        VietNamDongPrice: '12,000,000VND',
    },
];

const currentIndex = ref(0);

const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % tourTicket.length;
};

const prevSlide = () => {
    currentIndex.value =
        (currentIndex.value - 1 + tourTicket.length) % tourTicket.length;
};
</script>

<template>
    <div class="heading__box">
        <img
            loading="lazy"
            src="@/assets/images/icon-bg-plane.gif"
            class="icon-bg--plane"
            alt=""
        />
        <h3 class="heading">Great tours</h3>
        <h2 class="subheading">Discover the most exciting tours</h2>
    </div>
    <div class="ticket">
        <div class="ticket__navigation">
            <button
                class="ticket__btn-prev ticket__btn-primary"
                @click="prevSlide"
            >
                <img
                    loading="lazy"
                    class="ticket__icon-prev ticket__icon-navigation"
                    src="@/assets/fonts/left-arrow.svg"
                    alt=""
                />
            </button>
            <button
                class="ticket__btn-next ticket__btn-primary"
                @click="nextSlide"
            >
                <img
                    loading="lazy"
                    class="ticket__icon-next ticket__icon-navigation"
                    src="@/assets/fonts/right-arrow.svg"
                    alt=""
                />
            </button>
        </div>
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
                                    loading="lazy"
                                    src="@/assets/fonts/location.svg"
                                    alt=""
                                />
                                <p class="ticket__text">
                                    {{ ticket.locate }}
                                </p>
                            </div>
                            <div class="ticket__info-item ticket__user">
                                <img
                                    loading="lazy"
                                    src="@/assets/fonts/user.svg"
                                    alt=""
                                />
                                <p class="ticket__text">
                                    {{ ticket.guide }}
                                </p>
                            </div>
                            <div class="ticket__info-item ticket__times">
                                <img
                                    loading="lazy"
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
                    <button class="ticket__button button-primary">
                        Booking now
                    </button>
                </div>
            </div>
        </template>
        <div class="ticket__background">
            <img
                loading="lazy"
                src="@/assets/fonts/footer-background-ticket.svg"
                alt=""
            />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
.heading__box {
    position: relative;
    .icon-bg--plane {
        position: absolute;
        bottom: 20%;
        left: 10%;
        width: 15%;
        z-index: -1;
    }
}

.ticket {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    place-items: center;
    padding: 50px 140px;
    margin: 50px 0 500px 0;
    background: linear-gradient(to top, #f0bb84 43.08%, #e89a48 79.34%);
    font-family: $font-secondary;
    position: relative;

    &__background {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-49%);
        scale: 1.1;
        z-index: -1;
    }

    &__navigation {
        padding: 0 80px;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: space-between;
        gap: 20px;
        font-family: $font-secondary;
    }

    &__btn-primary {
        background-color: #fff;
        width: 50px;
        height: 50px;
        border-radius: 999px;
        border: 1px solid $color-primary;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    &__icon-navigation {
        width: 42px;
        height: 42px;
    }

    &__item {
        background-color: #fff;
        border-radius: 40px;
    }

    &__image {
        width: 429px;
        height: 292px;
        border-radius: 30px;
    }

    &__content {
        padding: 33px 0 0 12px;
    }

    &__title {
        text-align: center;
        font-size: 40px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
    }

    &__box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 15px;
        padding: 10px 0 40px 0;
        position: relative;
    }

    &__information {
        display: grid;
        gap: 18px;
    }

    &__info-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    &__text {
        color: #000;
    }

    &__line {
        background: #000;
        position: absolute;
        left: 40%;
        transform: translateX(-50%);
        height: 100%;
        width: 1px;
    }

    &__price {
        width: 165px;
        height: 105px;
        margin-right: 60px;
    }

    &__price-text {
        color: #000;
        text-align: center;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: capitalize;
    }

    &__button-box {
        margin: 20px 30px;
    }

    &__button {
        width: 100%;
        padding: 10px 0;
    }
}
</style>
