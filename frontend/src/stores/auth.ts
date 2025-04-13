import { defineStore } from 'pinia';
import axios from 'axios';
import type { User, UserLogin, UserSignUp } from '../types/auth.ts';
import type ResetPassword from '@/views/ResetPassword.vue';

interface AuthStore {
    user: User | null;
    errors: string[];
    role: string | null;
}

export const authStore = defineStore('auth', {
    state: (): AuthStore => {
        return {
            user: {
                username: '',
                email: '',
                role: '',
            } as User,
            errors: [],
            role: null,
        };
    },
    actions: {
        async Login(data: UserLogin) {
            try {
                // Fetch users from json-server
                const response = await axios.post('/user/signIn', data);
                if (response.status === 201) {
                    this.user = response.data.user;
                    localStorage.setItem(
                        'accessToken',
                        response.data.accessToken
                    );
                    return true;
                }
                return false;
            } catch (error: any) {
                this.errors.push(error.message || 'Login failed');
                return false;
            }
        },
        async SignUp(data: UserSignUp) {
            try {
                // Fetch users from json-server
                const response = await axios.post('/user/signUp', data);
            } catch (error: any) {
                this.errors.push(error.message || 'Sign up failed');
            }
        },
        async forgotPassword(email: string) {
            try {
                const response = await axios.post('/user/forgot-password', {
                    email,
                });
                console.log(response);

                if (response.status === 201) {
                    return true;
                }
                return false;
            } catch (error: any) {
                this.errors.push(error.message || 'Forgot password failed');
                return false;
            }
        },
        async resetPassword(
            email: string,
            password: string,
            resetToken: string
        ) {
            try {
                const response = await axios.post('/user/reset-password', {
                    email,
                    password,
                    resetToken,
                });
                console.log(response);

                if (response.status === 201) {
                    return true;
                }
                return false;
            } catch (error: any) {
                this.errors.push(error.message || 'Forgot password failed');
                return false;
            }
        },
        setUser(user: User) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
        },
    },
    getters: {
        isAuthenticated: (state) => {
            return !!state.user;
        },
    },
});
