<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
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
            <template v-for="i in 2">
                <router-link
                    :to="{ name: 'blog-detail', params: { blog: 'blog' + i } }"
                >
                    <div class="blog_card">
                        <div class="img"></div>
                        <div class="info">
                            <h1 class="title">
                                Top 10 Things You Can’t Miss in Hoi An – A
                                Timeless Charm by the Thu Bon River
                            </h1>
                            <p class="description">
                                Nestled along the gentle flow of the Thu Bon
                                River, Hoi An is a city that feels like a living
                                museum. With its lantern-lit streets, ancient
                                architecture, vibrant markets, and welcoming
                                locals, Hoi An captivates travelers from around
                                the world. Whether it’s your first visit or a
                                return journey, here are the Top 10 must-do
                                experiences that make Hoi An unforgettable.
                            </p>
                        </div>
                        <span class="line"></span>
                        <div class="footer">
                            <img src="../assets/fonts/calendar.svg" alt="" />
                            <p class="date">April 22, 2025</p>
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
