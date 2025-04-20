<script setup lang="ts">
interface story {
    title: String;
    description: String;
}
const props = defineProps<story>();
</script>

<template>
    <div class="story-item">
        <h1 class="story-item__heading">
            {{ props.title }}
        </h1>
        <p class="story-item__desc">
            {{ props.description }}
        </p>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
.story-item {
    border: 10px solid $color-primary;
    border-radius: 20px;
    padding: 32px 18px;
    height: fit-content;
    width: 100%;
    background-color: #fff;
    &__heading {
        color: $color-blue;
        font-size: 30px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        text-transform: uppercase;
    }
    &__desc {
        font-size: 25px;
        margin-top: 30px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
}
</style>
