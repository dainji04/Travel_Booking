<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
</script>

<template>
    <div class="contact">
        <Pagination
            title="about us"
            :link="['home', 'about']"
            :pagination="['Homepage', 'About']"
        />
    </div>
</template>

<style lang="scss"></style>
