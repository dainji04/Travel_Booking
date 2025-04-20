<script setup lang="ts">
import { authStore } from '@/stores/auth';
import { computed, onMounted, ref, useTemplateRef } from 'vue';

const useAuth = authStore();

const checkLogin = computed(() => useAuth.isAuthenticated);
const user = computed(() => useAuth.user);

const ScrollToTop = ref(false);

const toTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

onMounted(() => {
    window.addEventListener('scroll', () => {
        let a = 0;
        a = window.scrollY;

        if (a > 50) {
            a = 50;
        }

        if (window.scrollY > 100) {
            ScrollToTop.value = true;
        } else {
            ScrollToTop.value = false;
        }
    });
});
</script>

<template>
    <header class="header">
        <div class="navbar">
            <ul class="list">
                <router-link :to="{ name: 'home' }">
                    <li class="list__text">Home</li>
                </router-link>
                <router-link :to="{ name: 'tour' }">
                    <li class="list__text">Tour</li>
                </router-link>
                <router-link :to="{ name: 'about' }">
                    <li class="list__text">About Us</li>
                </router-link>
                <router-link :to="{ name: 'blog' }">
                    <li class="list__text">Blog</li>
                </router-link>
                <router-link :to="{ name: 'contact' }">
                    <li class="list__text">Contact</li>
                </router-link>
            </ul>
            <div class="options" v-if="checkLogin">
                <router-link class="list__text" :to="{ name: 'profile' }">
                    {{ user?.name }}
                </router-link>
                <router-link class="list__text" to="" @click="useAuth.logout()">
                    Logout
                </router-link>
            </div>
            <div class="options" v-else>
                <router-link class="list__text" :to="{ name: 'login' }">
                    Login
                </router-link>
            </div>
        </div>
        <div class="logo">
            <div class="logo__box">
                <img
                    loading="lazy"
                    class="logo__image"
                    src="@/assets/fonts/logo.svg"
                    alt=""
                />
            </div>
        </div>
    </header>
    <button class="scroll-to-top" v-if="ScrollToTop" @click="toTop">top</button>
</template>

<style lang="scss">
@use '@/assets/scss/header.scss';
</style>
