<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { blogStore } from '@/stores/blogStore';
import type { Blog } from '@/types/blog';
import { onMounted, ref } from 'vue';

const { getBlogList } = blogStore();

const blogList = ref<Blog[]>([]);

onMounted(async () => {
    await getBlogList(1, 3);
    blogList.value = blogStore().getBlogs;
});
</script>

<template>
    <div class="blogs">
        <div class="blogs__header">
            <h1 class="heading">blogs</h1>
            <h3 class="subheading">new post</h3>
        </div>
        <div class="blogs__container">
            <template v-for="blog in blogList" :key="blog">
                <div class="blogs__post">
                    <div
                        class="blogs__image"
                        :style="{
                            background: ` url(${blog.Thumbail}) lightgray 50% / cover no-repeat`,
                        }"
                    ></div>
                    <div class="blogs__content">
                        <h1 class="blogs__title">10 things you can expected</h1>
                        <p class="blogs__description">
                            {{ blog.Content }}
                        </p>
                    </div>
                    <button class="blogs__button button-primary">
                        <router-link
                            :to="{
                                name: 'blog-detail',
                                params: { id: blog.id },
                            }"
                        >
                            see details
                        </router-link>
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/scss/variables' as *;
.blogs {
    margin: 200px 150px 0;
    font-family: $font-secondary;

    &__header {
        display: grid;
        gap: 30px;
    }

    &__container {
        display: flex;
        justify-content: space-between;
        place-items: center;
        gap: 25px;
        margin-top: 80px;
    }

    &__post {
        padding: 25px 20px 15px 20px;
        border-radius: 40px;
        border: 10px solid $color-primary;
        display: grid;
        gap: 20px;
    }

    &__image {
        width: 100%;
        height: 250px;
        border-radius: 20px;
    }

    &__content {
        display: grid;
        gap: 10px;
        text-align: center;
        line-height: normal;
        padding: 0 25px;
        margin-bottom: 70px;
    }

    &__title {
        color: #000;
        font-size: 28px;
        font-weight: 700;
    }

    &__description {
        color: #000;
        text-align: center;
        font-size: 17px;
        font-weight: 400;
    }

    &__button {
        padding: 10px 0;
        margin-left: 30px;
        margin-right: 30px;
    }
}
</style>
