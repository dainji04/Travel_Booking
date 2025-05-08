<script setup lang="ts">
import { useRoute } from 'vue-router';
import Pagination from '@/components/Pagination.vue';

import ProgressBarCheckOut from '@/components/ProgressBarCheckOut.vue';

const route = useRoute();

// Access query parameters
const date = route.query.date;
const adults = route.query.adults;
const children = route.query.children;
const tourId = route.query.tourId;

console.log(date, adults, children, tourId); // Debugging: Check the values
</script>

<template>
    <pagination
        title="Check out"
        :link="['home', 'checkout']"
        :pagination="['Homepage', 'Check out']"
    />
    <div class="checkout">
        <ProgressBarCheckOut :step="2" />
        <div class="container"></div>
    </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/checkout';
</style>
