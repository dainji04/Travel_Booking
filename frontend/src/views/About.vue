<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import StoryItem from '@/components/StoryItem.vue';
import BlogsList from '@/components/BlogsList.vue';

const listStory = [
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
    <!-- contact -->
    <div class="contact">
        <Pagination
            title="about us"
            :link="['home', 'about']"
            :pagination="['Homepage', 'About']"
        />
    </div>
    <!-- introduce -->
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
    <!-- story -->
    <div class="story">
        <h1 class="story__title heading">story</h1>
        <p class="story__subtitle subheading">story about us</p>
        <div class="story__container">
            <div class="story__column-left">
                <template v-for="(story, index) in listStory" :key="story">
                    <template v-if="index % 2 === 0">
                        <StoryItem
                            :title="story.title"
                            :description="story.description"
                        />
                    </template>
                </template>
            </div>
            <div class="story__column-middle">
                <template v-for="i in 3" :key="i">
                    <div>
                        <template v-for="j in 3" :key="j">
                            <img src="@/assets/images/dot.png" alt="" />
                        </template>
                    </div>
                </template>
            </div>
            <div class="story__column-right">
                <template v-for="(story, index) in listStory" :key="story">
                    <template v-if="index % 2 !== 0">
                        <storyItem
                            :title="story.title"
                            :description="story.description"
                        />
                    </template>
                </template>
            </div>
        </div>
    </div>
    <!-- offer -->
    <div class="offer">
        <div class="offer__overlay"></div>
        <div class="offer__left">
            <h3 class="offer__heading">go & discover</h3>
            <h1 class="offer__subheading">special offer</h1>
            <p class="offer__desc">
                Discover unique special offers and exciting savings just for
                you.
            </p>
            <button class="offer__btn">CREATE AN ACCOUNT</button>
        </div>
        <div class="offer__right">
            <div class="offer__percent">
                <img src="@/assets/images/offer_percent.png" alt="" />
            </div>
            <img
                class="offer__bg-rotate"
                src="@/assets/images/offer.gif"
                alt=""
            />
        </div>
    </div>
    <!-- review -->
    <div class="review">
        <h3 class="review__heading">Good reviews</h3>
        <h1 class="review__subheading">
            Over 50,000 satisfied customers worldwide
        </h1>
        <div class="review__list-rv">
            <div class="review__list-item">
                <div class="review__list-content">
                    <p>
                        Great service, friendly staff, well organized trip. Will
                        continue to use Travel Booking's services.
                    </p>
                    <div class="stars">
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                    </div>
                </div>
                <div class="review__list-user">
                    <h1 class="review__username">TUAN PHAT</h1>
                    <p class="review__user-locate">New York</p>
                    <img
                        class="review__user-avatar"
                        src="@/assets/images/user_avatar/bing_chilling.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="review__list-item">
                <div class="review__list-content">
                    <p>
                        Great service, friendly staff, well organized trip. Will
                        continue to use Travel Booking's services.
                    </p>
                    <div class="stars">
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                    </div>
                </div>
                <div class="review__list-user">
                    <h1 class="review__username">TUAN PHAT</h1>
                    <p class="review__user-locate">New York</p>
                    <img
                        class="review__user-avatar"
                        src="@/assets/images/user_avatar/bing_chilling.png"
                        alt=""
                    />
                </div>
            </div>
            <div class="review__list-item">
                <div class="review__list-content">
                    <p>
                        Great service, friendly staff, well organized trip. Will
                        continue to use Travel Booking's services.
                    </p>
                    <div class="stars">
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                        <img src="@/assets/images/Star_blue.png" alt="" />
                    </div>
                </div>
                <div class="review__list-user">
                    <h1 class="review__username">TUAN PHAT</h1>
                    <p class="review__user-locate">New York</p>
                    <img
                        class="review__user-avatar"
                        src="@/assets/images/user_avatar/bing_chilling.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    </div>
    <BlogsList />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/about.scss';
</style>
