<script setup lang="ts">
import { authStore } from '@/stores/auth';
import Pagination from '@/components/Pagination.vue';
import { ref, useTemplateRef } from 'vue';

const useAuth = authStore();
const user = useAuth.getUser;
const inputImage = useTemplateRef('input-image');
const activeSection = ref('tour-booked');

const clickInputImage = () => {
    inputImage.value?.click();
};

const setActiveSection = (section: string) => {
    activeSection.value = section;
};

const signOut = () => {
    useAuth.logout();
    window.location.href = '/';
};
</script>

<template>
    <Pagination
        title="Profile"
        :link="['home', 'profile']"
        :pagination="['Homepage', 'Profile']"
    />
    <div class="profile">
        <div class="profile_header">
            <div class="profile_header--left">
                <div class="profile_avatar"></div>
                <h1 class="profile_name">Hello, {{ user?.Name }}</h1>
            </div>
            <button @click="signOut" class="profile_sign-out button-primary">
                <img
                    src="@/assets/fonts/profile/logout.svg"
                    alt="icon-sign-out"
                />
                Sign Out
            </button>
        </div>
        <div class="container">
            <div class="container--left">
                <div class="container_nav">
                    <div class="container_nav--item">
                        <button
                            @click="setActiveSection('tour-booked')"
                            :class="{ active: activeSection == 'tour-booked' }"
                            class="container_nav-btn btn"
                        >
                            <img
                                v-if="activeSection == 'tour-booked'"
                                class="icon"
                                src="@/assets/fonts/profile/ticket-active.svg"
                                alt="ticket-icon"
                            />
                            <img
                                v-else
                                class="icon"
                                src="@/assets/fonts/profile/ticket.svg"
                                alt="ticket-icon"
                            />
                            Tour booked
                        </button>
                    </div>
                    <div class="container_nav--item">
                        <button
                            @click="setActiveSection('account')"
                            :class="{ active: activeSection == 'account' }"
                            class="container_nav-btn btn"
                        >
                            <img
                                v-if="activeSection == 'account'"
                                class="icon"
                                src="@/assets/fonts/profile/user-active.svg"
                                alt="user-icon"
                            />
                            <img
                                v-else
                                class="icon"
                                src="@/assets/fonts/user.svg"
                                alt="user-icon"
                            />
                            account
                        </button>
                    </div>
                </div>
            </div>
            <div class="container--right">
                <!--show when click tour booked-->
                <div v-if="activeSection == 'tour-booked'" class="tour-booked">
                    <h1 class="tour-booked_title">tour booked</h1>
                    <p class="tour-booked_desc">
                        Below is a list of tour bookings that have been
                        successfully made.
                    </p>
                    <div class="tour-booked_options">
                        <div class="nav">
                            <button class="nav-btn btn active">
                                Active Booking
                            </button>
                            <button class="nav-btn btn">Booking History</button>
                        </div>
                        <div class="list">
                            <div class="list_active active">
                                <div class="list_item">
                                    <div class="list_item-thumbnail"></div>
                                    <div class="list_item-content">
                                        <p class="list_item-title">
                                            ha noi: capital of vietnam
                                        </p>
                                        <p class="list_item-departure info">
                                            Departure: may, 01, 2025
                                        </p>
                                        <p class="list_item-booking info">
                                            Success
                                        </p>
                                        <p class="list_item-payment info">
                                            Success
                                        </p>
                                        <p class="list_item-price info">
                                            Total: 1,000,000 VND
                                        </p>
                                        <button
                                            class="button-primary detail-btn"
                                        >
                                            View Detail
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--show when click account-->
                <div class="account" v-if="activeSection == 'account'">
                    <h1 class="account_title">Account</h1>
                    <p class="account_desc">
                        Edit your account details and password using the form
                        below.
                    </p>
                    <form class="account_form" action="" method="post">
                        <div class="avatar" @click="clickInputImage">
                            <input
                                ref="input-image"
                                type="file"
                                id="avatar"
                                accept="image/*"
                                hidden
                            />
                        </div>
                        <div class="form-group">
                            <input
                                type="text"
                                id="name"
                                autocomplete="off"
                                :value="user?.Name"
                                required
                            />
                            <label for="name">Name</label>
                        </div>
                        <div class="form-group">
                            <input
                                type="email"
                                id="email"
                                autocomplete="off"
                                :value="user?.Email"
                                required
                            />
                            <label for="email">Email</label>
                        </div>
                        <div class="form-group">
                            <input
                                type="number"
                                id="phone"
                                autocomplete="off"
                                :value="user?.Phone"
                                required
                            />
                            <label for="phone">Number</label>
                        </div>
                        <button class="btn-submit button-primary">
                            Save the changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/profile';
</style>
