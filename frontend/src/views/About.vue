<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import BlogItem from '@/components/BlogItem.vue';

const blogs = [
    {
        title: 'Technological innovation',
        description:
            'This brings a fresh and exciting approach to choosing travel destinations and assisting customers in planning their trips.',
    },
    {
        title: 'Focus on customer experience',
        description:
            'In 2023, Vivu focuses on improving customer experience. The company invests in a professional customer care team to support and answer all customer questions. In addition, Vivu increases the collection of customer feedback to improve the system and ensure user satisfaction.',
    },
    {
        title: 'Expanding Services',
        description:
            'In 2020, Travel Booking expanded its service portfolio by partnering with multiple partners in the travel industry. This allows Travel Booking to offer a range of additional services, including air tickets, airport transfers, car rentals and more. Customers can enjoy a complete travel experience through a single platform.',
    },
    {
        title: 'development',
        description:
            '2022 marks a significant expansion and development of Travel Booking in terms of scale and scope of operations. Travel Booking expands its market to many new tourist destinations, providing detailed information and booking services at attractive destinations nationwide. The company also strengthens its partnerships with travel service providers to bring diversity and quality to customers.',
    },
    {
        title: 'inception',
        description:
            'Travel Booking Company was established with the goal of providing reliable and convenient travel services to customers.',
    },
    {
        title: 'inception',
        description:
            'Travel Booking Company was established with the goal of providing reliable and convenient travel services to customers. Travel Booking launched a website and mobile application, providing information on tourist destinations, hotel reservations and tours.',
    },
];
</script>

<template>
    <div class="contact">
        <Pagination
            title="about us"
            :link="['home', 'about']"
            :pagination="['Homepage', 'About']"
        />
    </div>
    <div class="introduce">
        <div class="introduce__left">
            <div class="introduce__left-item center">
                <img src="@/assets/images/introduce_1.png" alt="" />
            </div>
            <div class="introduce__left-item right-top">
                <p>25 Years Experience</p>
            </div>
            <div class="introduce__left-item right-middle">
                <img src="@/assets/images/introduce_1.png" alt="" />
            </div>
            <div class="introduce__left-item right-bottom">
                <p>20,000+ Customers</p>
            </div>
        </div>
        <div class="introduce__right">
            <h3 class="introduce__title">we are travel booking</h3>
            <h1 class="introduce__subtitle">
                travel booking is the best choice for your trip.
            </h1>
            <p class="introduce__desc">
                With thousands of travel destinations, detailed travel guides
                and helpful tips, we'll help you plan amazing trips and
                unforgettable experiences.
            </p>
            <div class="introduce__list">
                <ul class="introduce__list-left">
                    <li class="introduce__list-item">Itinerary Guide</li>
                    <li class="introduce__list-item">Reviews</li>
                    <li class="introduce__list-item">
                        Booking and Booking Online
                    </li>
                    <li class="introduce__list-item">
                        Travel Profile Information
                    </li>
                </ul>
                <ul class="introduce__list-right">
                    <li class="introduce__list-item">Detailed location</li>
                    <li class="introduce__list-item">
                        Communication and experience sharing
                    </li>
                    <li class="introduce__list-item">Travel News and Trends</li>
                </ul>
            </div>
            <button class="introduce__button button-primary">READ MORE</button>
        </div>
    </div>
    <div class="blogs">
        <h1 class="blogs__title heading">Blogs</h1>
        <p class="blogs__subtitle subheading">new post</p>
        <div class="blogs__container">
            <div class="blogs__column-left">
                <template v-for="(blog, index) in blogs" :key="blog">
                    <template v-if="index % 2 === 0">
                        <BlogItem
                            :title="blog.title"
                            :description="blog.description"
                        />
                    </template>
                </template>
            </div>
            <div class="blogs__column-middle">
                <template v-for="i in 3" :key="i">
                    <div>
                        <template v-for="j in 3" :key="j">
                            <img src="@/assets/images/dot.png" alt="" />
                        </template>
                    </div>
                </template>
            </div>
            <div class="blogs__column-right">
                <template v-for="(blog, index) in blogs" :key="blog">
                    <template v-if="index % 2 !== 0">
                        <BlogItem
                            :title="blog.title"
                            :description="blog.description"
                        />
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/about.scss';
</style>
