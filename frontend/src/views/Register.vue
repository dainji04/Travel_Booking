<script lang="ts" setup>
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, email, minLength, sameAs } from '@vuelidate/validators';
import AuthLayout from '@/layouts/AuthLayout.vue';
// import useApi from '@/composables/useApi';

const isHide = ref(false);
const formData = ref({
    name: '',
    email: '',
    password: '',
    remember: false,
});

const rules = {
    name: {
        required,
    },
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
            <h1 class="sign-up__heading">Register</h1>
        </div>
        <div class="sign-up__form">
            <form action="">
                <div class="sign-up__input-group">
                    <div class="sign-up__form-group">
                        <input
                            v-model="formData.name"
                            class="sign-up__input sign-up__input-password"
                            type="text"
                            placeholder="Username"
                        />
                        <div v-if="v$.name.$error">
                            <p class="error" v-if="v$.name.required.$invalid">
                                Tên là bắt buộc!
                            </p>
                        </div>
                    </div>
                    <div class="sign-up__form-group">
                        <input
                            v-model="formData.email"
                            class="sign-up__input"
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
                    <div class="sign-up__form-group">
                        <input
                            v-model="formData.password"
                            class="sign-up__input sign-up__input-password"
                            type="password"
                            placeholder="Password"
                        />
                        <img
                            class="sign-up__show-password"
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
                    class="sign-up__submit sign-up__form-group"
                    type="submit"
                    @click.prevent="submit()"
                >
                    <span>Register</span>
                </button>
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
            <p class="sign-up__footer-text">have an account?</p>
            <router-link class="sign-up__footer-link" :to="{ name: 'login' }">
                Login
            </router-link>
        </div>
    </AuthLayout>
</template>

<style lang="scss">
@use '@/assets/scss/register.scss';
</style>
