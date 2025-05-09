<script setup lang="ts">
import { useRoute } from 'vue-router';
import Pagination from '@/components/Pagination.vue';
import { ref } from 'vue';

import ProgressBarCheckOut from '@/components/ProgressBarCheckOut.vue';

const route = useRoute();

const step = ref(2);

// Access query parameters
const date = route.query.date;
const adults = route.query.adults;
const children = route.query.children;
const tourId = route.query.tourId;

const total = Number(adults) * 600 + Number(children) * 400;

console.log(date, adults, children, tourId); // Debugging: Check the values
</script>

<template>
    <pagination
        title="Check out"
        :link="['home', 'checkout']"
        :pagination="['Homepage', 'Check out']"
    />
    <div class="checkout">
        <ProgressBarCheckOut :step="step" />
        <div class="container">
            <!-- step 3 -->
            <div class="step container-step" v-show="step == 2">
                <div class="box">
                    <div class="coupon">
                        <button class="close">
                            <img src="@/assets/fonts/close.svg" alt="close" />
                        </button>
                        <div class="coupon_question">
                            <p>Have a coupon code?</p>
                            <p>
                                Add your coupon code below to get your discount
                            </p>
                        </div>
                        <div class="coupon_input">
                            <input
                                type="text"
                                placeholder="Enter your coupon code"
                            />
                            <button class="btn">Apply</button>
                        </div>
                    </div>
                </div>
                <div class="tour-info">
                    <div class="left">
                        <h1 class="heading">Payment Details</h1>
                        <form class="form-info" action="#">
                            <template
                                v-for="index in Number(adults)"
                                :key="index"
                            >
                                <h1>adult: {{ index }}</h1>
                                <div class="form-group">
                                    <input
                                        class="input-primary"
                                        type="text"
                                        required
                                    />
                                    <label>name</label>
                                </div>
                                <div class="form-group">
                                    <input
                                        class="input-primary"
                                        type="text"
                                        required
                                    />
                                    <label>CCCD</label>
                                </div>
                                <div class="form-group">
                                    <input
                                        class="input-primary"
                                        type="text"
                                        required
                                    />
                                    <label>email</label>
                                </div>
                            </template>
                            <template v-for="i in Number(children)" :key="i">
                                <h1>children: {{ i }}</h1>
                                <div class="form-group">
                                    <input
                                        class="input-primary"
                                        type="text"
                                        required
                                    />
                                    <label>name</label>
                                </div>
                            </template>
                            <div class="btn-group">
                                <button
                                    type="submit"
                                    class="button-primary btn"
                                    @click.stop.prevent="step++"
                                >
                                    Book Now
                                </button>
                                <button class="button-primary btn">
                                    reset
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="right">
                        <h1 class="heading">Tour booking information</h1>
                        <div class="about-tour">
                            <h1>Ha Noi - Capital of VietNam</h1>
                            <p class="date">Starting Date: May 1 2025</p>
                            <p class="tripcode">Tripcode: WTE-2957</p>
                        </div>
                        <hr />
                        <div class="info">
                            <p class="desc">tourist</p>
                            <p v-if="date" class="info-item">
                                date: {{ date }}
                            </p>
                            <p v-if="adults" class="info-item">
                                adults: {{ adults }}
                                <span>(600$/person)</span>
                            </p>
                            <p v-if="children" class="info-item">
                                children: {{ children }}
                                <span>(400$/person)</span>
                            </p>
                        </div>
                        <hr />
                        <p class="total">TOTAL: {{ total }}$</p>
                    </div>
                </div>
            </div>
            <div class="step container-step" v-show="step == 3">step 3</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/checkout';
</style>
