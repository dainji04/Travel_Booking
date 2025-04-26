<script setup lang="ts">
import { useIntersectionObserver } from '@vueuse/core';
import { shallowRef, useTemplateRef } from 'vue';

interface Props {
    video?: string;
    title: String;
    link: String[];
    pagination: String[];
}

const props = withDefaults(defineProps<Props>(), {
    video: 'https://videos.pexels.com/video-files/14619269/14619269-uhd_2732_1194_30fps.mp4',
});

// Viewport by vueuse/core
// const video = useTemplateRef<HTMLDivElement>('video');
// const targetIsVisible = shallowRef(false);

// const { stop } = useIntersectionObserver(video, ([entry], observerElement) => {
//     console.log(entry.isIntersecting);

//     targetIsVisible.value = entry?.isIntersecting || false;
// });
</script>

<template>
    <div class="pagination">
        <video
            ref="video"
            class="HeroHeader_video__EIQOL"
            autoplay
            loop
            muted
            playsinline
            poster="https://cms.junglebosstours.com/assets/d8e58d9e-4d8b-40bc-8601-afe4f7df62ca?format=webp"
        >
            <source :src="props.video" type="video/mp4" />
        </video>
        <h1 class="pagination__title">{{ props.title }}</h1>
        <div class="pagination__list">
            <template v-for="(item, index) in props.pagination" :key="index">
                <router-link
                    class="pagination__item-link"
                    :to="{ name: `${link[index]}` }"
                >
                    <p class="pagination__item">{{ item }}</p>
                </router-link>
            </template>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.HeroHeader_video__EIQOL {
    position: absolute;
    z-index: -2;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.pagination {
    position: relative;
    width: 100%;
    height: 430px;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 120px;
    &__title {
        font-size: 60px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
    }
    &__list {
        display: flex;
        align-items: center;
        margin-top: 10px;
    }
    &__item-link {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
    }
    &__item-link:first-child::after {
        content: '/';
        padding: 0 10px;
        font-size: 35px;
    }
    &__item {
        font-size: 35px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
}
</style>
