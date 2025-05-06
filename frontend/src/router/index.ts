import { createRouter, createWebHistory } from 'vue-router';
import { authStore } from '../stores/auth';

import AdminLayout from '../layouts/AdminLayout.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';

const routes = [
    { path: '/', redirect: '/trang-chu' },
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
            }
        ]
    },
    {
        path: '/',
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
            {
                path: 'forgot-password',
                name: 'forgotPassword',
                component: () => import('../views/FotgotPassword.vue'),
                meta: { requiresAuth: false },
            },
            {
                path: 'reset-password',
                name: 'resetPassword',
                component: () => import('../views/ResetPassword.vue'),
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
                component: () => import('../views/Home.vue'),
            },
            {
                path: 'du-lich',
                name: 'tour',
                component: () => import('../views/Tour.vue'),
            },
            {
                path: 'du-lich/:slug',
                name: 'tourDetail',
                component: () => import('../views/TourDetail.vue'),
            },
            {
                path: 'gioi-thieu',
                name: 'about',
                // route level code-splitting
                // this generates a separate chunk (About.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () => import('../views/About.vue'),
            },
            {
                path: 'bai-viet',
                name: 'blog',
                component: () => import('../views/Blog.vue'),
            },
            {
                path: 'lien-he',
                name: 'contact',
                component: () => import('../views/Contact.vue'),
            },
            {
                path: 'profile',
                name: 'profile',
                component: () => import('../views/Profile.vue'),
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

// router.beforeEach(async (to, from, next) => {
//     const useAuth = authStore();
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
//     const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)
//     console.log('check auth', useAuth.isAdmin)
//     if (requiresAuth && !useAuth.accessToken) {
//         next('/login')
//     } else if (requiresAdmin && !useAuth.isAdmin) {
//         next('/trang-chu')
//     } else if (!requiresAuth && useAuth.accessToken) {
//         useAuth.isAdmin ? next('/admin/dashboard') : next('/')
//     } else {
//         next()
//     }
// })

export default router;
