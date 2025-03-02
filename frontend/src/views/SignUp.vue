<script lang="ts" setup>
import { ref } from 'vue';

const isHide = ref(false);
</script>

<template>
    <div class="sign-up">
        <div class="sign-up__left-side"></div>
        <div class="sign-up__right-side" :class="{ show: isHide }">
            <div class="sign-up__wave">
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
                <img
                    class="sign-up__logo"
                    src="@/assets/fonts/logo.svg"
                    alt="logo"
                />
            </div>
            <div>
                <h1 class="sign-up__heading">Login</h1>
            </div>
            <div class="sign-up__form">
                <form action="">
                    <div class="sign-up__input-group">
                        <div class="sign-up__form-group">
                            <input
                                class="sign-up__input"
                                type="text"
                                placeholder="Email or phone number"
                            />
                        </div>
                        <div class="sign-up__form-group">
                            <input
                                class="sign-up__input sign-up__input-password"
                                type="password"
                                placeholder="password"
                            />
                            <img
                                class="sign-up__show-password"
                                src="@/assets/fonts/eyeHide.svg"
                                alt=""
                            />
                        </div>
                    </div>
                    <button
                        class="sign-up__submit sign-up__form-group"
                        type="submit"
                    >
                        <span>login</span>
                    </button>
                    <div class="sign-up__options">
                        <div class="sign-up__remember">
                            <input class="sign-up__checkbox" type="checkbox" />
                            <span>Remember password</span>
                        </div>
                        <div class="sign-up__forgot-link">
                            <a class="sign-up__forgot-password" href="#"
                                >Forgot password?</a
                            >
                        </div>
                    </div>
                </form>
            </div>
            <div class="sign-up__separator sign-up__form-group">
                <span class="sign-up__line"></span>
                <p class="sign-up__or-text">or</p>
                <span class="sign-up__line"></span>
            </div>
            <div class="sign-up__social-auth">
                <img
                    class="sign-up__social-icon sign-up__social-icon--facebook"
                    src="@/assets/fonts/facebook.svg"
                    alt="Facebook login"
                />
                <img
                    class="sign-up__social-icon sign-up__social-icon--google"
                    src="@/assets/fonts/google.svg"
                    alt="Google login"
                />
            </div>
            <div class="sign-up__footer">
                <p class="sign-up__footer-text">Don't have an account?</p>
                <a class="sign-up__footer-link" href="#"> Sign up </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/scss/signUp.scss';
</style>
