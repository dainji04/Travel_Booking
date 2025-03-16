<script setup lang="ts">
interface Props {
    title: String;
    link: String[];
    pagination: String[];
}

const props = defineProps<Props>();
</script>

<template>
    <div class="pagination">
        <h1 class="pagination__title">{{ props.title }}</h1>
        <div class="pagination__list">
            <template v-for="(item, index) in props.pagination" :key="item">
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

<style lang="scss">
.pagination {
    width: 100%;
    height: 427px;
    background: url(../assets/images/bg-panigation.jpg) center no-repeat;
    background-size: cover;
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
