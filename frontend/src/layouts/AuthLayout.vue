<script lang="ts" setup></script>

<template>
    <div class="auth-layout">
        <div class="auth-layout__left-side"></div>
        <div class="auth-layout__right-side">
            <div class="auth-layout__wave">
                <svg
                    width="324"
                    height="854"
                    viewBox="0 0 324 854"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M99.3523 47.7704L141 0H324V854H39.1388L55.6975 817.963L68.7438 790.306L81.2883 761.393L91.8256 733.317L100.356 710.27L110.391 680.518L117.918 651.604L120.929 634.424L124.943 608.444V585.396L122.434 561.092L117.918 537.626L105.875 502.008L88.8149 465.971L67.2384 426.162L48.1708 391.801L35.6263 369.173L22.5801 341.516L11.5409 313.441L3.01068 285.784L0 259.804V232.147L5.01779 203.234L12.5445 178.929L20.573 160.073L41.6477 124.873L56.7011 102.664L72.2562 79.6173L99.3523 47.7704Z"
                        fill="white"
                    />
                </svg>
            </div>
            <div>
                <router-link :to="{ name: 'home' }">
                    <img
                        class="auth-layout__logo"
                        src="@/assets/fonts/logo.svg"
                        alt="logo"
                    />
                </router-link>
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/scss/authLayout.scss';
</style>
