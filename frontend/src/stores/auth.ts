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
        isAuthenticated: (state: any) => {
            return state.accessToken ? true : false;
        },
        getUser: (state) => {
            return state.user;
        },
    },
    actions: {
        async Login(data: UserLogin) {
            try {
                // Fetch users from json-server
                const response = await axios.post('/user/signIn', data);
                if (response.status === 201) {
                    localStorage.setItem(
                        'accessToken',
                        response.data.accessToken
                    );
                    this.setUser();
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
        async forgotPassword(email: string) {
            try {
                const response = await axios.post('/user/forgot-password', {
                    email,
                });
                if (response.status === 201) {
                    return true;
                }
                return false;
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
                console.log(response);

                if (response.status === 201) {
                    return true;
                }
                return false;
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
            await localStorage.removeItem('accessToken');
            await localStorage.removeItem('user');

            this.user = null;
            this.accessToken = await null;
            console.log('Logout successful');
        },
    },
});
