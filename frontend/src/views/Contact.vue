<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';

const formData = ref({
    lastName: '',
    firstName: '',
    email: '',
    phoneNumber: '',
    comment: '',
});

const formSubmit = () => {
    console.log('Form submitted', formData.value);
};
</script>

<template>
    <div class="contact">
        <Pagination
            title="contact"
            :link="['home', 'contact']"
            :pagination="['Homepage', 'Contact']"
        />
        <div class="information">
            <h1 class="information__title heading">information</h1>
            <div class="information__list">
                <div class="information__item">
                    <div class="information__box-image">
                        <img
                            src="@/assets/fonts/location3.svg"
                            alt=""
                            class="information__image"
                        />
                    </div>
                    <div class="information__text">
                        <h4 class="information__text-heading">Location</h4>
                        <p class="information__text-description">
                            Location 180 Cao Lo Street, Ward 4, District 8, Ho
                            Chi Minh City
                        </p>
                    </div>
                </div>
                <div class="information__item">
                    <div class="information__box-image">
                        <img
                            src="@/assets/fonts/phone-message.svg"
                            alt=""
                            class="information__image"
                        />
                    </div>
                    <div class="information__text">
                        <h4 class="information__text-heading">Contact</h4>
                        <p class="information__text-description">
                            Mobile: 0909878789
                        </p>
                        <p class="information__text-description">
                            Hotline: 0909858586
                        </p>
                    </div>
                </div>
                <div class="information__item">
                    <div class="information__box-image">
                        <img
                            src="@/assets/fonts/clock2.svg"
                            alt=""
                            class="information__image"
                        />
                    </div>
                    <div class="information__text">
                        <h4 class="information__text-heading">Office Hour</h4>
                        <p class="information__text-description">
                            Mon - Fri: 9:00 - 18:00
                        </p>
                        <p class="information__text-description">
                            Sat - Sun: 9:00 - 12:00
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <h1 class="main__title heading">Contact with us</h1>
            <h3 class="main__subtitle subheading">contact</h3>
            <p class="main__description">
                We are always happy to hear from you, your questions and
                suggestions. On the contact page you will find a simple form
                where you can fill in the necessary information.
            </p>
            <form class="main__form" action="">
                <div class="main__group-input">
                    <input
                        v-model="formData.lastName"
                        name="lastName"
                        type="text"
                        class="main__input"
                        placeholder="Last Name*"
                        autocomplete="off"
                    />
                    <input
                        v-model="formData.firstName"
                        name="firstName"
                        type="text"
                        class="main__input"
                        placeholder="First Name*"
                        autocomplete="off"
                    />
                </div>
                <div class="main__group-input">
                    <input
                        v-model="formData.email"
                        name="email"
                        type="email"
                        class="main__input"
                        placeholder="email*"
                        autocomplete="off"
                    />
                    <input
                        v-model="formData.phoneNumber"
                        name="phoneNumber"
                        type="text"
                        class="main__input"
                        placeholder="phone Number*"
                        autocomplete="off"
                    />
                </div>
                <div class="main__group-input">
                    <textarea
                        v-model="formData.comment"
                        name="comment"
                        type="text"
                        class="main__input main__textarea"
                        placeholder="write something..."
                    ></textarea>
                </div>
                <button
                    @click.prevent="formSubmit()"
                    class="main__btn-submit button-primary"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/contact.scss';
</style>
