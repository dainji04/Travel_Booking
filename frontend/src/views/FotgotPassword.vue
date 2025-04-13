<script lang="ts" setup>
import { ref } from 'vue';
import { authStore } from '@/stores/auth.ts';

const email = ref('');
const Submit = async () => {
    if (email.value === '') {
        alert('Please enter your email or phone number');
        return;
    }
    const useAuth = authStore();
    await useAuth.forgotPassword(email.value);
};
</script>

<template>
    <div class="body">
        <div class="forgotPwd__container">
            <router-link to="/">Home</router-link>

            <div>
                <h1 class="forgotPwd__heading">Forgot Password</h1>
            </div>
            <div class="forgotPwd__form">
                <form action="">
                    <div class="forgotPwd__form-group">
                        <input
                            v-model="email"
                            class="forgotPwd__input"
                            type="text"
                            placeholder="Email or phone number"
                        />
                    </div>
                    <button
                        class="forgotPwd__submit forgotPwd__form-group"
                        @click.prevent="Submit()"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
.body {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #6aa4d63f;
}
.forgotPwd {
    &__container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 400px;
        width: 500px;
        background-color: #fff;
        border-radius: 20px;
        box-shadow: 11px 10px 15px -4px rgba(0, 0, 0, 0.34);
    }
    &__heading {
        margin-top: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #000;
        font-size: 50px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-transform: uppercase;
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 56px;
        z-index: 999;
    }

    &__input-group {
        display: flex;
        flex-direction: column;
        gap: 25px;
    }

    &__form-group {
        width: 424px;
        height: 55px;
        position: relative;
    }

    &__input {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 50px;
        outline: none;
        font-size: 25px;
        padding: 5px 25px;
        border: 2px solid #000;
        background-color: #fff;
    }
    &__submit {
        position: relative;
        margin-top: 40px;
        background: $primary-rgb-gradient-color;
        border-radius: 50px;
        cursor: pointer;
        font-size: 25px;
        color: #fff;
        overflow: hidden; // Ẩn phần thừa của pseudo-elements
        transition: color 0.3s;
        z-index: 1;
        &::after {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 0;
            height: 100%;
            background: rgba(238, 204, 81, 1);
            transition: width 0.3s ease;
            z-index: -1;
        }

        &:hover {
            color: #000;

            &::after {
                width: 100%;
            }
        }
        span {
            position: relative;
            z-index: 2;
        }
    }

    &__submit:hover {
        background: $secondary-color;
    }
}
</style>
