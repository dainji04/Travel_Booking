<script setup lang="ts">
import Pagination from '@/components/Pagination.vue';
import TicketList from '@/components/TicketList.vue';

import hueImg from '@/assets/images/tour_available/hue.png';
import BuonMeThuotImg from '@/assets/images/tour_available/buon_me_thuot.png';
import HaNoiImg from '@/assets/images/tour_available/ha_noi.png';
import MangDenImg from '@/assets/images/tour_available/mang_den.png';
import PhuYenImg from '@/assets/images/tour_available/phu_yen.png';
import NinhThuanImg from '@/assets/images/tour_available/ninh_thuan.png';

const tourAvailable = [
    {
        img: hueImg,
        title: 'Hue',
        tourNumber: 1,
        slug: 'hue',
    },
    {
        img: HaNoiImg,
        title: 'Ha Noi',
        tourNumber: 1,
        slug: 'ha-noi',
    },
    {
        img: BuonMeThuotImg,
        title: 'Buon Me Thuot',
        tourNumber: 1,
        slug: 'buon-me-thuot',
    },
    {
        img: MangDenImg,
        title: 'Mang Den',
        tourNumber: 1,
        slug: 'mang-den',
    },
    {
        img: PhuYenImg,
        title: 'Phu Yen',
        tourNumber: 1,
        slug: 'phu-yen',
    },
    {
        img: NinhThuanImg,
        title: 'Ninh Thuan',
        tourNumber: 1,
        slug: 'ninh-thuan',
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
                <RouterLink
                    :to="{ name: 'tourDetail', params: { slug: tour.slug } }"
                >
                    <div class="available__item">
                        <img :src="tour.img" alt="" />
                        <div>
                            <h1 class="available__title">{{ tour.title }}</h1>
                            <img src="@/assets/fonts/right-arrow2.svg" alt="" />
                        </div>
                    </div>
                </RouterLink>
            </template>
        </div>
    </div>
    <TicketList />
</template>

<style lang="scss" scoped>
@use '@/assets/scss/tour.scss';
</style>
