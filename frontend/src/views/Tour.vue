<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import Pagination from '@/components/Pagination.vue';
import TicketList from '@/components/TicketList.vue';

import { tourStore } from '@/stores/tourStore.ts';
import type { Tour } from '@/types/tour';
const tourAvailable = ref<Tour[]>([]);

const { getTourList } = tourStore();

const route = useRoute();
const router = useRouter();

const page = ref(Number(route.query.page) || 1);

onMounted(async () => {
    router.replace({
        query: {
            page: page.value.toString(),
            limit: 6,
        },
    });
    await getTourList(page.value, 10);
    tourAvailable.value = tourStore().getTours;
});
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
            <template v-for="tour in tourAvailable" :key="tour.id">
                <RouterLink
                    :to="{ name: 'tourDetail', params: { id: tour.id } }"
                >
                    <div class="available__item">
                        <img
                            class="available__item-thumbnail"
                            :src="tour.Thumbnail"
                            alt=""
                        />
                        <div>
                            <h1 class="available__title">{{ tour.Name }}</h1>
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
