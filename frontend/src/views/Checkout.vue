<script setup lang="ts">
import { useRoute } from 'vue-router';
import router from '@/router';
import Pagination from '@/components/Pagination.vue';
import { ref } from 'vue';

import ProgressBarCheckOut from '@/components/ProgressBarCheckOut.vue';

import checkEmail from '@/plugins/checkEmail';

const route = useRoute();

const date = route.query.date;
const adults = route.query.adults;
const children = route.query.children;
const tour = route.query?.tourId;
const hotel = route.query?.hotelId;

const total = Number(adults) * 600 + Number(children) * 400;

interface AdultForm {
    name: string;
    cccd: string;
    email: string;
}

interface ChildForm {
    name: string;
}

const adultForms = ref<AdultForm[]>([]);
const childForms = ref<ChildForm[]>([]);
for (let i = 0; i < Number(adults); i++) {
    adultForms.value.push({ name: '', cccd: '', email: '' });
}
for (let i = 0; i < Number(children); i++) {
    childForms.value.push({ name: '' });
}

const focusEmptyInput = () => {
    const emptyAdultInput = adultForms.value.findIndex(
        (adult) => !adult.name || !adult.cccd || !adult.email
    );
    if (emptyAdultInput !== -1) {
        const input = document.querySelector(
            `.form-info .form-group:nth-of-type(${
                emptyAdultInput * 3 + 1
            }) input`
        ) as HTMLInputElement;

        input?.focus();
        return false;
    }

    const emptyChildInput = childForms.value.findIndex((child) => !child.name);
    if (emptyChildInput !== -1) {
        const input = document.querySelector(
            `.form-info .form-group:nth-of-type(${
                adultForms.value.length * 3 + emptyChildInput + 1
            }) input`
        ) as HTMLInputElement;
        input?.focus();
        return false;
    }
    return true;
};

const handleFormSubmit = () => {
    const isNotEmpty = focusEmptyInput();
    const isEmailValidated = checkEmail(
        adultForms.value.map((adult) => adult.email)
    );
    console.log(isEmailValidated);

    if (isEmailValidated && isNotEmpty) {
        router.push({
            name: 'thankYou',
            state: {
                date,
                adults,
                children,
                adultForms: JSON.stringify(adultForms.value),
                childForms: JSON.stringify(childForms.value),
            },
        });
    }
};

const clearForms = () => {
    adultForms.value = adultForms.value.map(() => ({
        name: '',
        cccd: '',
        email: '',
    }));
    childForms.value = childForms.value.map(() => ({ name: '' }));
};
</script>

<template>
    <pagination
        title="Check out"
        :link="['home', 'checkout']"
        :pagination="['Homepage', 'Check out']"
    />
    <div class="checkout">
        <ProgressBarCheckOut :step="2" />
        <div class="container">
            <!-- step 3 -->
            <div class="step container-step">
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
                                        v-model="adultForms[index - 1].name"
                                    />
                                    <label>Name</label>
                                </div>
                                <div class="form-group">
                                    <input
                                        class="input-primary"
                                        type="text"
                                        required
                                        v-model="adultForms[index - 1].cccd"
                                        minlength="12"
                                        maxlength="12"
                                        oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                                    />
                                    <label>CCCD</label>
                                </div>
                                <div class="form-group">
                                    <input
                                        class="input-primary"
                                        type="text"
                                        required
                                        v-model="adultForms[index - 1].email"
                                    />
                                    <label>Email</label>
                                </div>
                            </template>
                            <template v-for="i in Number(children)" :key="i">
                                <h1>children: {{ i }}</h1>
                                <div class="form-group">
                                    <input
                                        class="input-primary"
                                        type="text"
                                        required
                                        v-model="childForms[i - 1].name"
                                    />
                                    <label>Name</label>
                                </div>
                            </template>
                            <div class="btn-group">
                                <button
                                    type="submit"
                                    class="button-primary btn"
                                    @click.stop.prevent="handleFormSubmit()"
                                >
                                    Book Now
                                </button>
                                <button
                                    class="button-primary btn"
                                    @click.prevent="clearForms()"
                                >
                                    reset
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="right">
                        <h1 class="heading">Tour booking information</h1>
                        <div class="about-tour">
                            <h1 v-if="tour">{{ tour }}</h1>
                            <h1 v-else>{{ hotel }}</h1>
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
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/checkout';
</style>
