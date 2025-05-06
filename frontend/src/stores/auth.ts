import { defineStore } from 'pinia';
import axios from 'axios';
import type { User, UserLogin, UserSignUp } from '../types/auth.ts';

interface AuthStore {
    user: User | null;
    accessToken: string | null;
}

interface data {
    user: User;
    accessToken: string;
}

export const authStore = defineStore('auth', {
    state: (): AuthStore => {
        return {
            user: JSON.parse(localStorage.getItem('user') || 'null'),
            accessToken: localStorage.getItem('accessToken'),
        };
    },
    getters: {
        isAdmin:(state) => {
            console.log(state.user?.role)
            return false;
        },
        isAuthenticated: (state: any) => {
            return !!state.accessToken;
        },
        getUser: (state) => {
            return state.user;
        }
    },
    actions: {
        async Login(data: UserLogin) {
            try {
                // Fetch users from json-server
                const response = await axios.post('/user/signIn', {
                    email: data.email,
                    password: data.password,
                });
                if (response.status === 201) {
                    localStorage.setItem(
                        'accessToken',
                        response.data.accessToken
                    );
                    await this.setUser();
                    return true;
                }
                return false;
            } catch (error: any) {
                return false;
            }
        },
        async SignUp(data: UserSignUp) {
            await axios.post('/user/signUp', data);
        },
        async verifyEmailOTP(otp: string, email: string) {
            try {
                const response = await axios.post('/user/verify-otp', {
                    email,
                    otp,
                });
                console.log(response);
                return response.status === 200;

            } catch (error: any) {
                console.log(error);
                return false;
            }
        },
        async forgotPassword(email: string) {
            try {
                const response = await axios.post('/user/forgot-password', {
                    email,
                });
                return response.status === 201;

            } catch (error: any) {
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
                return response.status === 201;

            } catch (error: any) {
                return false;
            }
        },
        async setUser() {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const res = await axios.get('/user/me1', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                localStorage.setItem('user', JSON.stringify(res.data));
                this.user = res.data;
                this.accessToken = accessToken;
            } catch (error) {
                console.log('Error fetching user data:', error);
            }
        },
        async logout() {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');

            this.user = null;
            this.accessToken = null;
            console.log('Logout successful');
        },
    },
});
