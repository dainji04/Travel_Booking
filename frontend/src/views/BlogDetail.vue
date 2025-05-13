<script setup lang="ts">
const props = defineProps({
    blog: {
        type: String,
        required: true,
    },
});
</script>

<template>
    <div class="blog-detail">
        <h1>{{ props.blog }}</h1>
    </div>
</template>

<style scoped>
.blog-detail {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.blog-meta {
    color: #888;
    font-size: 0.9em;
    margin-bottom: 20px;
}

.blog-content {
    line-height: 1.6;
}
</style>
