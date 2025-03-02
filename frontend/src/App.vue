<template>
    <component :is="layoutComponent">
        <router-view />
    </component>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

export default {
    computed: {
        layoutComponent() {
            // Lấy thông tin layout từ meta của route
            const layout = this.$route.meta.layout || 'default';
            return layout === 'default' ? DefaultLayout : EmptyLayout;
        },
    },
};
</script>
