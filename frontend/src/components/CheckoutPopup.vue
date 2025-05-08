<script setup lang="ts">
import { ref } from 'vue';
import { Dayjs } from 'dayjs';
import ProgressBarCheckOut from '@/components/ProgressBarCheckOut.vue';
import { computed } from '@vue/reactivity';
import router from '@/router';

const value = ref<Dayjs>();
const step = ref(0);
const dateUser = ref('');
const quantityAdult = ref(0);
const quantityChildren = ref(0);
const total = computed(() => {
    return quantityAdult.value * 600 + quantityChildren.value * 400;
});

const onSelect = (date: any, { source }: any) => {
    if (source === 'date') {
        dateUser.value = date.format('YYYY-MM-DD');
    }
};

const nextStep = () => {
    if (step.value == 1) {
        if (quantityAdult.value == 0 && quantityChildren.value == 0) {
            alert('Please select at least one person!');
            return;
        }
        if (dateUser.value == '') {
            alert('Please select a date!');
            return;
        }
        router.push({
            name: 'checkout',
            query: {
                date: dateUser.value,
                adults: quantityAdult.value,
                children: quantityChildren.value,
                tourId: 1,
            },
        });
    }
    step.value = step.value + 1;
};

const prevStep = () => {
    step.value = step.value - 1;
};

const isActive = (stepNumber: number) => {
    return step.value === stepNumber;
};
</script>

<template>
    <div @click="$emit('close')" class="overlay"></div>
    <div class="checkout-popup">
        <ProgressBarCheckOut :step />
        <div class="container">
            <div class="container--left">
                <div class="nav">
                    <div
                        @click="step = 0"
                        class="date nav-item cursor"
                        :class="{ active: isActive(0) }"
                    >
                        <img
                            src="@/assets/fonts/calendar-black.svg"
                            alt="calendar"
                        />
                        <h3 :class="{ active: isActive(0) }">Date & Time</h3>
                    </div>
                    <img
                        class="nav-item"
                        src="@/assets/fonts/arrow-right.svg"
                        alt="arrow-right"
                    />
                    <div
                        :class="{ active: isActive(1) }"
                        @click="step = 1"
                        class="nav-quantity nav-item cursor"
                    >
                        <img src="@/assets/fonts/people.svg" alt="people" />
                        <h3 :class="{ active: isActive(1) }">Quantity</h3>
                    </div>
                </div>
                <div class="body">
                    <div class="calendar" v-show="isActive(0)">
                        <a-calendar
                            @select="onSelect"
                            v-model:value="value"
                            :fullscreen="false"
                        />
                    </div>
                    <div class="quantity" v-show="isActive(1)">
                        <div class="quantity-panel">
                            <div class="quantity-item">
                                <p>Adults</p>
                                <div class="quantity-box">
                                    <p class="quantity-price">600$/person</p>
                                    <div class="controls">
                                        <button
                                            @click="
                                                quantityAdult = Math.max(
                                                    0,
                                                    quantityAdult - 1
                                                )
                                            "
                                        >
                                            -
                                        </button>
                                        <span>{{ quantityAdult }}</span>
                                        <button
                                            @click="
                                                quantityAdult =
                                                    quantityAdult + 1
                                            "
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div class="quantity-item">
                                <p>Babies</p>
                                <div class="quantity-box">
                                    <p class="quantity-price">400$/person</p>
                                    <div class="controls">
                                        <button
                                            @click="
                                                quantityChildren = Math.max(
                                                    0,
                                                    quantityChildren - 1
                                                )
                                            "
                                        >
                                            -
                                        </button>
                                        <span>{{ quantityChildren }}</span>
                                        <button
                                            @click="
                                                quantityChildren =
                                                    quantityChildren + 1
                                            "
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="navigation">
                        <button
                            v-show="step > 0"
                            @click="prevStep()"
                            class="button-back"
                        >
                            back
                        </button>
                        <button
                            @click="nextStep()"
                            class="button-primary button-continue"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
            <div class="container--right">
                <p class="title">tour set information</p>
                <h1 class="name subheading">Ha Noi - Capital of Vietnam</h1>
                <h1 class="heading date">Starting date: may 1, 2025</h1>
                <hr />
                <div class="info">
                    <p class="desc">tourist</p>
                    <p v-if="dateUser" class="info-item">
                        date: {{ dateUser }}
                    </p>
                    <p v-if="quantityAdult > 0" class="info-item">
                        adults: {{ quantityAdult }} <span>(600$/person)</span>
                    </p>
                    <p v-if="quantityChildren > 0" class="info-item">
                        children: {{ quantityChildren }}
                        <span>(400$/person)</span>
                    </p>
                </div>
                <hr />
                <p class="total">TOTAL: {{ total }}$</p>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/variables' as *;

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.container {
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: 100%;

    &--left {
        height: 100%;
        border-right: 1px solid $color--black;
    }

    .body {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 50px;

        .button-continue {
            padding: 5px 35px;
            border-radius: 10px;
        }
        .calendar {
            width: 500px;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
        }
        .navigation {
            position: absolute;
            bottom: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
        }
        .button-back {
            background-color: transparent;
            border: none;
            outline: none;
            font-size: 16px;
        }
    }

    &--right {
        padding: 20px 50px;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .title {
            color: $color--black;
            font-size: 25px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            text-transform: uppercase;
        }

        .name {
            font-size: 24px;
            font-weight: bold;
            text-align: start;
        }

        .date {
            font-size: 20px;
            font-weight: bold;
            text-align: start;
        }

        .desc {
            font-size: 20px;
            font-weight: bold;
            text-align: start;
            text-transform: uppercase;
        }

        .info-item {
            font-size: 18px;
            font-weight: bold;
            text-align: start;
            text-transform: uppercase;
        }

        .info-item span {
            font-size: 18px;
            float: right;
            text-transform: uppercase;
            color: $color--black;
            opacity: 0.8;
        }

        .total {
            color: $color--black;
            text-align: end;
            font-size: 25px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
    }
}

.checkout-popup {
    height: 75%;
    width: 60%;
    margin: 0 auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 50px 0;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    overflow: hidden;

    .nav {
        margin-top: 15px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: 20px;
        border-bottom: 1px solid $color--black;

        &-item {
            display: flex;
            justify-items: center;
            align-items: center;
            gap: 10px;
            padding: 0 20px 30px;

            &.active {
                border-bottom: 2px solid $color-primary;
            }

            img {
                width: 24px;
                height: 24px;
            }

            h3 {
                color: $color--black;
                font-size: 25px;
                font-style: normal;
                font-weight: 700;
                line-height: 40px;
                text-transform: uppercase;
            }
        }
    }
}

.quantity {
    width: 100%;
    &-panel {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 50px;
    }

    &-box {
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 20px;
        width: 100%;
    }

    &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        border-radius: 10px;
        background-color: $color--white;
        padding: 20px 30px;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
        width: 80%;

        p {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
        }

        .controls {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;

            button {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background-color: $color-primary;
                border: none;
                outline: none;
                font-size: 20px;
                font-weight: bold;
                color: $color--white;

                &:hover {
                    cursor: pointer;
                    background-color: $color-primary;
                }
            }
        }

        span {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            text-transform: uppercase;
        }
    }
}
</style>
