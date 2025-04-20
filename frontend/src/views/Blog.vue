<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
</script>

<template>
    <div class="contact">
        <Pagination
            video="src/assets/videos/somethingelse.mp4"
            title="Blog"
            :link="['home', 'blog']"
            :pagination="['Homepage', 'Blog']"
        />
    </div>
</template>

<style lang="scss" scoped></style>
