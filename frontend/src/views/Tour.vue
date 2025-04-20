<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import TicketList from '@/components/TicketList.vue';
const tourAvailable = [
    {
        img: 'src/assets/images/tour_available/hue.png',
        title: 'Hue',
        tourNumber: 1,
    },
    {
        img: 'src/assets/images/tour_available/ha_noi.png',
        title: 'Ha Noi',
        tourNumber: 1,
    },
    {
        img: 'src/assets/images/tour_available/buon_me_thuot.png',
        title: 'Buon Me Thuot',
        tourNumber: 1,
    },
    {
        img: 'src/assets/images/tour_available/mang_den.png',
        title: 'Mang Den',
        tourNumber: 1,
    },
    {
        img: 'src/assets/images/tour_available/phu_yen.png',
        title: 'Phu Yen',
        tourNumber: 1,
    },
    {
        img: 'src/assets/images/tour_available/ninh_thuan.png',
        title: 'Ninh Thuan',
        tourNumber: 1,
    },
];
</script>

<template>
    <div class="contact">
        <Pagination
            title="tour"
            :link="['home', 'tour']"
            :pagination="['Homepage', 'tour']"
        />
    </div>
    <!-- Tour Available -->
    <div class="available">
        <h1 class="heading">tour available</h1>
        <h1 class="subheading">give you comfort and convenience</h1>
        <div class="available__container">
            <!-- slice make sure just render item 0->5 (6 items) -->
            <template
                v-for="(tour, index) in tourAvailable.slice(0, 6)"
                :key="index"
            >
                <div class="available__item">
                    <img :src="tour.img" alt="" />
                    <div>
                        <h1 class="available__title">{{ tour.title }}</h1>
                        <img src="@/assets/fonts/right-arrow2.svg" alt="" />
                    </div>
                </div>
            </template>
        </div>
    </div>
    <TicketList />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/tour.scss';
</style>
