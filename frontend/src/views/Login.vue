<script lang="ts" setup>
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import AuthLayout from '@/layouts/AuthLayout.vue';

const isHide = ref(false);
const formData = ref({
    email: '',
    password: '',
    remember: false,
});

const rules = {
    email: {
        required,
        email,
    },
    password: {
        required,
        minLength: minLength(6),
    },
};

const v$ = useVuelidate(rules, formData);

const submit = async () => {
    const isValid = await v$.value.$validate();
    if (isValid) {
        console.log('Form hợp lệ!', formData.value);
    }
};
</script>

<template>
    <AuthLayout>
        <div>
            <h1 class="login__heading">Login</h1>
        </div>
        <div class="login__form">
            <form action="">
                <div class="login__input-group">
                    <div class="login__form-group">
                        <input
                            v-model="formData.email"
                            class="login__input"
                            type="text"
                            placeholder="Email or phone number"
                        />
                        <div v-if="v$.email.$error">
                            <p class="error" v-if="v$.email.required.$invalid">
                                Email là bắt buộc!
                            </p>
                            <p class="error" v-if="v$.email.email.$invalid">
                                Email không hợp lệ
                            </p>
                        </div>
                    </div>
                    <div class="login__form-group">
                        <input
                            v-model="formData.password"
                            class="login__input login__input-password"
                            type="password"
                            placeholder="password"
                        />
                        <img
                            class="login__show-password"
                            src="@/assets/fonts/eyeHide.svg"
                            alt=""
                        />
                        <div v-if="v$.password.$error">
                            <p
                                class="error"
                                v-if="v$.password.required.$invalid"
                            >
                                Mật khẩu là bắt buộc!
                            </p>
                            <p
                                class="error"
                                v-if="v$.password.minLength.$invalid"
                            >
                                Tối thiểu 6 ký tự
                            </p>
                        </div>
                    </div>
                </div>
                <button
                    class="login__submit login__form-group"
                    type="submit"
                    @click.prevent="submit()"
                >
                    <span>login</span>
                </button>
                <div class="login__options">
                    <div class="login__remember">
                        <input
                            v-model="formData.remember"
                            class="login__checkbox"
                            type="checkbox"
                        />
                        <span>Remember password</span>
                    </div>
                    <div class="login__forgot-link">
                        <a class="login__forgot-password" href="#"
                            >Forgot password?</a
                        >
                    </div>
                </div>
            </form>
        </div>
        <div class="login__separator login__form-group">
            <span class="login__line"></span>
            <p class="login__or-text">or</p>
            <span class="login__line"></span>
        </div>
        <div class="login__social-auth">
            <img
                class="login__social-icon login__social-icon--facebook"
                src="@/assets/fonts/facebook.svg"
                alt="Facebook login"
            />
            <img
                class="login__social-icon login__social-icon--google"
                src="@/assets/fonts/google.svg"
                alt="Google login"
            />
        </div>
        <div class="login__footer">
            <p class="login__footer-text">Don't have an account?</p>
            <router-link class="login__footer-link" :to="{ name: 'register' }"
                >Sign up</router-link
            >
        </div>
    </AuthLayout>
</template>

<style lang="scss">
@use '@/assets/scss/login.scss';
</style>
