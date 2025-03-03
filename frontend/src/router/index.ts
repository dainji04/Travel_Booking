import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import EmptyLayout from '../layouts/EmptyLayout.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: EmptyLayout,
            children: [
                {
                    path: 'dang-nhap',
                    name: 'login',
                    component: () => import('../views/Login.vue'),
                    meta: { requiresAuth: false },
                },
                {
                    path: 'dang-ky',
                    name: 'register',
                    component: () => import('../views/Register.vue'),
                    meta: { requiresAuth: false },
                },
            ],
        },
        {
            path: '/',
            component: DefaultLayout,
            children: [
                {
                    path: 'trang-chu',
                    name: 'home',
                    component: HomeView,
                },
                {
                    path: 'gioi-thieu',
                    name: 'about',
                    // route level code-splitting
                    // this generates a separate chunk (About.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () => import('../views/AboutView.vue'),
                },
            ],
        },
        { path: '/', redirect: '/trang-chu' },
    ],
});

export default router;
