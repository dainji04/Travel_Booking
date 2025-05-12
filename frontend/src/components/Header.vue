<script setup lang="ts">
import { authStore } from '@/stores/auth';
import { computed, onMounted, ref, useTemplateRef } from 'vue';

const useAuth = authStore();
const isShowTour = ref(false);

const checkLogin = computed(() => useAuth.isAuthenticated);
// const user = computed(() => useAuth.user);

// const ScrollToTop = ref(false);

// const toTop = () => {
//   window.scrollTo({
//     top: 0,
//     behavior: 'smooth',
//   });
// };

// onMounted(() => {
//   window.addEventListener('scroll', () => {
//     let a = 0;
//     a = window.scrollY;

//     if (a > 50) {
//       a = 50;
//     }

//     if (window.scrollY > 100) {
//       ScrollToTop.value = true;
//     } else {
//       ScrollToTop.value = false;
//     }
//   });
// });
</script>

<template>
    <header class="header">
        <div class="navbar">
            <div class="logo">
                <img src="@/assets/images/admin/logo.png" alt="logo" />
            </div>
            <ul class="list">
                <router-link class="list-item" :to="{ name: 'home' }">
                    <li class="list__link">Home</li>
                </router-link>
                <div
                    @mousemove="isShowTour = true"
                    @mouseleave="isShowTour = false"
                    class="tour list-item"
                >
                    <li class="list__link">Tour</li>
                    <ul class="list_link-option" v-show="isShowTour">
                        <router-link :to="{ name: 'tour' }">
                            <li class="list_link-option-item">
                                tour available
                            </li>
                        </router-link>
                        <router-link :to="{ name: 'hotel' }">
                            <li class="list_link-option-item">
                                create your tour
                            </li>
                        </router-link>
                    </ul>
                </div>
                <router-link class="list-item" :to="{ name: 'about' }">
                    <li class="list__link">About Us</li>
                </router-link>
                <router-link class="list-item" :to="{ name: 'blog' }">
                    <li class="list__link">Blog</li>
                </router-link>
                <router-link class="list-item" :to="{ name: 'contact' }">
                    <li class="list__link">Contact</li>
                </router-link>
            </ul>
            <div class="options">
                <router-link
                    v-if="checkLogin"
                    class="options__avatar"
                    :to="{ name: 'profile' }"
                >
                    <div class="avatar_user"></div>
                </router-link>
                <router-link v-else class="list__link" :to="{ name: 'login' }">
                    Login
                </router-link>
            </div>
        </div>
    </header>
    <!--    <button class="scroll-to-top" v-if="ScrollToTop" @click="toTop">top</button>-->
    <a-back-top
        style="width: 60px; height: 60px; right: 150px; bottom: 100px"
    />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/header.scss';
</style>
