import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUp from '@/views/SignUp.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/trang-chu',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/gioi-thieu',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/dang-ky',
            name: 'signUp',
            component: () => SignUp,
            meta: { layout: 'empty' },
        },
    ],
});

export default router;
