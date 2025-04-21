<script setup lang="ts">
const blogs = [
    {
        img: 'src/assets/images/hoianBlog.png',
        title: 'Top 10 things to do when coming to Hoi An',
        description:
            "Hoi An's Ancient Town is a well-preserved historical site, known for its blend of traditional Vietnamese, Chinese, and Japanese architecture. The charming streets, lantern-lit evenings, and vibrant markets make it a UNESCO World Heritage gem.",
    },
    {
        img: 'src/assets/images/daklakBlog.png',
        title: 'Top 10 things to do when coming to Hoi An',
        description:
            "Hoi An's Ancient Town is a well-preserved historical site, known for its blend of traditional Vietnamese, Chinese, and Japanese architecture. The charming streets, lantern-lit evenings, and vibrant markets make it a UNESCO World Heritage gem.",
    },
    {
        img: 'src/assets/images/phuyenBlog.png',
        title: 'Top 10 things to do when coming to Hoi An',
        description:
            "Hoi An's Ancient Town is a well-preserved historical site, known for its blend of traditional Vietnamese, Chinese, and Japanese architecture. The charming streets, lantern-lit evenings, and vibrant markets make it a UNESCO World Heritage gem.",
    },
];
</script>

<template>
    <div class="blogs">
        <div class="blogs__header">
            <h1 class="heading">blogs</h1>
            <h3 class="subheading">new post</h3>
        </div>
        <div class="blogs__container">
            <template v-for="blog in blogs" :key="blog">
                <div class="blogs__post">
                    <div
                        class="blogs__image"
                        :style="{
                            background: ` url(${blog.img}) lightgray 50% / cover no-repeat`,
                        }"
                    ></div>
                    <div class="blogs__content">
                        <h1 class="blogs__title">{{ blog.title }}</h1>
                        <p class="blogs__description">
                            {{ blog.description }}
                        </p>
                    </div>
                    <button class="blogs__button button-primary">
                        see details
                    </button>
                </div>
            </template>
        </div>
    </div>
</template>

<style lang="scss">
@use '@/assets/scss/variables' as *;
.blogs {
    margin: 200px 0;
    font-family: $font-secondary;
    margin-left: 150px;
    margin-right: 150px;

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
