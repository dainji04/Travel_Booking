<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
</script>

<template>
    <div class="contact">
        <Pagination
            title="tour"
            :link="['home', 'tour']"
            :pagination="['Homepage', 'tour']"
        />
    </div>
</template>

<style lang="scss"></style>
