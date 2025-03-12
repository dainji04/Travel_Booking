<template>
    <header id="header">
        <ul class="list">
            <router-link :to="{ name: 'home' }">
                <li class="list__text">Home</li>
            </router-link>
            <router-link to="">
                <li class="list__text">Tour</li>
            </router-link>
            <router-link :to="{ name: 'about' }">
                <li class="list__text">About Us</li>
            </router-link>
            <router-link to="">
                <li class="list__text">Blog</li>
            </router-link>
            <router-link to="">
                <li class="list__text">Contact</li>
            </router-link>
        </ul>
        <div class="options">
            <!-- <img class="options__icon" src="@/assets/fonts/search.svg" alt="" />
            <img class="options__icon" src="@/assets/fonts/list.svg" alt="" /> -->
            <router-link :to="{ name: 'login' }"> Login </router-link>
        </div>
    </header>
</template>

<style lang="scss">
@import '@/assets/scss/header.scss';
</style>
