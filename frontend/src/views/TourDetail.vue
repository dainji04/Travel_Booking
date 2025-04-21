<script setup lang="ts">
import { useRoute } from 'vue-router';
const router = useRoute();
const name = router.params.slug as string;
</script>

<template>
    <div class="detail-tour">
        <h1 class="tour-name">{{ name }}</h1>
        <p class="tour-description">
            Explore the details of the tour named "{{ name }}".
        </p>
    </div>
</template>

<style lang="scss" scoped>
.detail-tour {
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .tour-name {
        font-size: 24px;
        font-weight: bold;
        color: #333;
        margin-bottom: 10px;
    }

    .tour-description {
        font-size: 16px;
        color: #666;
    }
}
</style>
