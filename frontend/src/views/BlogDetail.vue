<script setup lang="ts">
import { blogStore } from '@/stores/blogStore';
import type { Blog } from '@/types/blog';
import { onMounted, ref } from 'vue';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const blog = ref<Blog>();
const useBlogStore = blogStore();

onMounted(async () => {
    await useBlogStore.getBlogItem(props.id);
    blog.value = useBlogStore.getBlog;
});
</script>

<template>
    <div class="blog-detail">
        <img :src="blog?.Cover_img" alt="" />
        <h1>{{ blog?.Content }}</h1>
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
