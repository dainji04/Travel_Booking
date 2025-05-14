import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '../stores/auth';

import AdminLayout from '../layouts/AdminLayout.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/admin', redirect: 'admin/dashboard' },
    {
        path: '/admin',
        component: AdminLayout,
        meta: { requiresAuth: true, requiresAdmin: true },
        children: [
            {
                path: 'dashboard',
                name: 'dashboard',
                component: () => import('../views/admin/Dashboard.vue'),
            },
        ],
    },
    {
        path: '/',
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('../views/Login.vue'),
            },
            {
                path: 'register',
                name: 'register',
                component: () => import('../views/Register.vue'),
            },
            {
                path: 'forgot-password',
                name: 'forgotPassword',
                component: () => import('../views/ForgotPassword.vue'),
            },
            {
                path: 'reset-password',
                name: 'resetPassword',
                component: () => import('../views/ResetPassword.vue'),
            },
        ],
    },
    {
        path: '/',
        component: DefaultLayout,
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('../views/Home.vue'),
            },
            {
                path: 'tour',
                name: 'tour',
                component: () => import('../views/Tour.vue'),
            },
            {
                path: 'tour-create',
                name: 'tourOrder',
                component: () => import('../views/TourOrder.vue'),
            },
            {
                path: 'tour/:id',
                name: 'tourDetail',
                component: () => import('../views/TourDetail.vue'),
                props: true,
            },
            {
                path: 'checkout',
                name: 'checkout',
                component: () => import('../views/Checkout.vue'),
            },
            {
                path: 'thank-you',
                name: 'thankYou',
                component: () => import('../views/ThankYou.vue'),
            },
            {
                path: 'hotel',
                name: 'hotel',
                component: () => import('../views/BookingHotel.vue'),
            },
            {
                path: 'hotel/:id',
                name: 'hotelDetail',
                component: () => import('../views/HotelDetail.vue'),
                props: true,
            },
            {
                path: 'car',
                name: 'car',
                component: () => import('../views/Car.vue'),
            },
            {
                path: 'about',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('../views/About.vue'),
            },
            {
                path: 'blog',
                name: 'blog',
                component: () => import('../views/Blog.vue'),
            },
            {
                path: 'blog/:id',
                name: 'blog-detail',
                component: () => import('../views/BlogDetail.vue'),
                props: true,
            },
            {
                path: 'contact',
                name: 'contact',
                component: () => import('../views/Contact.vue'),
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('../views/Profile.vue'),
                meta: { requiresAuth: true },
            },
            {
                path: '/:pathMatch(.*)*',
                name: 'notFound',
                component: () => import('../views/NotFound.vue'),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

router.beforeEach(async (to, from, next) => {
    const useAuth = authStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

    if (to.name === 'checkout') {
        const { date, adults, children, tourId } = to.query;
        if (!date || !adults || !children || !tourId) {
            return next({ path: '/404' }); // Redirect to 404 page
        }
    }

    if (requiresAuth) {
        if (useAuth.getUser) {
            next();
        } else {
            next('/login');
        }
    } else {
        next();
    }
});

export default router;
