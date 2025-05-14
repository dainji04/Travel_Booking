<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import { blogStore } from '@/stores/blogStore';
import type { Blog } from '@/types/blog';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const { getBlogList } = blogStore();

const blogList = ref<Blog[]>([]);

const route = useRoute();
const router = useRouter();
const page = Number(route.query.page || 1);
onMounted(async () => {
    router.replace({
        query: {
            page: page,
            limit: 3,
        },
    });

    await getBlogList(page, 3);
    blogList.value = blogStore().getBlogs;
});
</script>

<template>
    <div class="contact">
        <Pagination
            title="Blog"
            :link="['home', 'blog']"
            :pagination="['Homepage', 'Blog']"
        />
    </div>
    <div class="blog">
        <h1 class="heading">blog</h1>
        <div class="list-blogs">
            <template v-for="blog in blogList">
                <router-link
                    :to="{ name: 'blog-detail', params: { id: blog.id } }"
                >
                    <div class="blog_card">
                        <div class="img">
                            <img :src="blog.Thumbail" :alt="blog.Thumbail" />
                        </div>
                        <div class="info">
                            <h1 class="title">
                                Top 10 Things You Can’t Miss in Hoi An – A
                                Timeless Charm by the Thu Bon River
                            </h1>
                            <p class="description">
                                {{ blog.Content }}
                            </p>
                        </div>
                        <span class="line"></span>
                        <div class="footer">
                            <img src="../assets/fonts/calendar.svg" alt="" />
                            <p class="date">
                                {{
                                    new Date(
                                        blog.Create_at
                                    ).toLocaleDateString()
                                }}
                            </p>
                        </div>
                    </div>
                </router-link>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/blog.scss';
</style>
