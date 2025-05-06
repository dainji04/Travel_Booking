<script lang="ts" setup>
import {reactive, ref} from 'vue';
import useVuelidate from '@vuelidate/core';
import {required, email, minLength, sameAs} from '@vuelidate/validators';
import AuthLayout from '@/layouts/AuthLayout.vue';
import {authStore} from '@/stores/auth';
import type {UserSignUp} from '@/types/auth';
// import useApi from '@/composables/useApi';

const isHide = ref(false);

const isPopupVisible = ref(false);
const otp = ref(Array(6).fill(''));
const useAuth = authStore();

const focusNext = (index: number) => {
  const inputs = document.querySelectorAll('.otp-input');
  if (otp.value[index] && index < 5) {
    (inputs[index + 1] as HTMLInputElement).focus();
  }
};

const formData = reactive<UserSignUp>({
  name: '',
  email: '',
  password: '',
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
    console.log('Form is valid', formData);

    await useAuth.SignUp(formData);
    isPopupVisible.value = true;
  }
};

const submitOtp = async () => {
  const enteredOtp = otp.value.join('');
  console.log('Entered OTP:', enteredOtp);
  await useAuth.verifyEmailOTP(enteredOtp, formData.email)
};

const closePopup = () => {
  isPopupVisible.value = false;
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
  <!--    Pop Up OTP-->
  <div v-if="isPopupVisible" class="otp-popup">
    <div class="otp-popup__content">
      <h2>Enter OTP</h2>
      <p>Please enter the 6-digit OTP sent to your phone.</p>
      <div class="otp-inputs">
        <input
            v-for="(digit, index) in otp"
            :key="index"
            v-model="otp[index]"
            maxlength="1"
            type="text"
            class="otp-input"
            @input="focusNext(index)"
        />
      </div>
      <button @click="submitOtp" class="otp-submit">Submit</button>
      <button @click="closePopup" class="otp-close">Close</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/register.scss';

.otp-popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.otp-popup__content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}

.otp-inputs {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
}

.otp-input {
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.otp-submit,
.otp-close {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.otp-submit {
  background: #4caf50;
  color: white;
}

.otp-close {
  background: #f44336;
  color: white;
}
</style>
