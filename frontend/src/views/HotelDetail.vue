<script setup lang="ts">
import { hotelStore } from '@/stores/hotelStore';
import { onMounted, ref } from 'vue';
import type { Hotel } from '@/types/hotel';

import CheckoutPopup from '@/components/CheckoutPopup.vue';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});

const hotel = ref<Hotel>();
const useHotelStore = hotelStore();
const getItemHotel = useHotelStore.getItemHotel;
onMounted(async () => {
    await getItemHotel(props.id);
    hotel.value = hotelStore().getHotel;
});
</script>

<template>
    <div class="hotel-details">
        <div class="gallery">
            <div class="main-image">
                <img :src="hotel?.Avatar" alt="Main Hotel Image" />
            </div>
            <div class="thumbnails">
                <template
                    v-for="(img, index) in hotel?.Images.slice(1, 3)"
                    :key="index"
                >
                    <img :src="img" alt="room" />
                </template>
                <!-- <img src="../assets/images/hotel.png" alt="View" /> -->
                <div class="more-images">
                    <div>+{{ hotel?.Images.length }} images</div>
                </div>
            </div>
        </div>
        <div class="tabs">
            <button class="active">Overview</button>
            <button>Rooms</button>
            <button>Guest Reviews</button>
        </div>
        <span class="line"></span>
        <div class="overview">
            <div class="left">
                <h1 class="title">{{ hotel?.Name }}</h1>
                <div class="rating">
                    <span>
                        <template v-for="i in Math.floor(hotel?.Rate || 0)">
                            ⭐
                        </template>
                    </span>
                    <p>{{ hotel?.Rate }} (22 reviews)</p>
                </div>
                <div class="description">
                    <p>Overview</p>
                    <p class="text">
                        {{ hotel?.Name }} offers a perfect blend of comfort,
                        convenience, and warm hospitality, making it a top
                        choice for travelers visiting Hanoi. With well-equipped
                        rooms featuring free WiFi, flat-screen TVs, and
                        minibars, guests can relax with ease. The hotel provides
                        room service, a swimming pool, a restaurant, and free
                        parking. <br /><br />
                        Its central location puts guests within easy reach of
                        key attractions such as Hoan Kiem Lake, St. Joseph’s
                        Cathedral, Thang Long Imperial Citadel, Hoa Lo Prison,
                        Temple of Literature, and Vietnamese Women’s Museum.
                        Guests also enjoy nearby green spaces like Thong Nhat
                        Park and Ly Thai To Park.<br /><br />
                        Whether you're here for business or leisure, Hôtel du
                        Parc Hanoï offers a peaceful stay with easy access to
                        the best of Hanoi.
                    </p>
                </div>
                <span class="line"></span>
                <div class="top-facilities">
                    <h1>Top facilities</h1>
                    <div class="list-facilities">
                        <div class="facility">
                            <img
                                src="../assets/fonts/hotel/free-wifi.svg"
                                alt="free wifi"
                            />
                            <p>Free Wifi</p>
                        </div>
                        <div class="facility">
                            <img
                                src="../assets/fonts/hotel/business-services.svg"
                                alt=""
                            />
                            <p>Business Services</p>
                        </div>
                    </div>
                    <div class="list-facilities">
                        <div class="facility">
                            <img
                                src="../assets/fonts/hotel/air-condition.svg"
                                alt=""
                            />
                            <p>Air Conditioning</p>
                        </div>
                        <div class="facility">
                            <img
                                src="../assets/fonts/hotel/swimming.svg"
                                alt=""
                            />
                            <p>Swimming Pool</p>
                        </div>
                    </div>
                    <div class="list-facilities">
                        <div class="facility">
                            <img
                                src="../assets/fonts/hotel/parking.svg"
                                alt=""
                            />
                            <p>Parking Available</p>
                        </div>
                        <div class="facility">
                            <img
                                src="../assets/fonts/hotel/top-rated.svg"
                                alt=""
                            />
                            <p>Top Rated</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <img :src="hotel?.Avatar" alt="hotel cover" />
            </div>
        </div>

        <div class="availability">
            <h1>Available Room</h1>
            <div class="rooms">
                <div class="card">
                    <img
                        src="https://khachsandep.vn/storage/files/0%200%20%20bi%20quyet%20thiet%20ke%20homestay%20dep/0%20tieu%20chuan%20thiet%20ke%20phong%20tong%20thong/anh-bia-tieu-chuan-thiet-ke-phong-tong-thong.jpg"
                        alt=""
                    />
                    <div class="info">
                        <h1 class="name">Presidential Suite</h1>
                        <div class="facilities">
                            <div class="facility">
                                <img
                                    src="../assets/fonts/hotel/business-services.svg"
                                    alt="business services"
                                />
                                <p>
                                    Luxurious room with a king-size bed and
                                    premium amenities
                                </p>
                            </div>
                            <div class="facility">
                                <img
                                    src="../assets/fonts/hotel/swimming.svg"
                                    alt="sleep 3"
                                />
                                <p>Sleep 3 people</p>
                            </div>
                            <div class="facility">
                                <img
                                    src="../assets/fonts/hotel/top-rated.svg"
                                    alt="free wifi"
                                />
                                <p>1 large double bed</p>
                            </div>
                        </div>
                    </div>
                    <button class="button-primary btn-reverse">
                        <router-link to="/car"
                            >Book Presidential Suite</router-link
                        >
                    </button>
                </div>
                <div class="card">
                    <img
                        src="https://lh5.googleusercontent.com/proxy/Myk7d-QQRiINHu6MpL4KajQIdkUXdzBiulocLfDPDPTGwI0vJ-O1zkr91f-mU298dGLbOyYLHVrYwvDEwdazfVzcsufwVsNEyis"
                        alt=""
                    />
                    <div class="info">
                        <h1 class="name">Two-Bedroom Suite</h1>
                        <div class="facilities">
                            <div class="facility">
                                <img
                                    src="../assets/fonts/hotel/business-services.svg"
                                    alt="business services"
                                />
                                <p>Comfortable room with two separate beds</p>
                            </div>
                            <div class="facility">
                                <img
                                    src="../assets/fonts/hotel/swimming.svg"
                                    alt="sleep 4"
                                />
                                <p>Sleep 4 people</p>
                            </div>
                            <div class="facility">
                                <img
                                    src="../assets/fonts/hotel/top-rated.svg"
                                    alt="free wifi"
                                />
                                <p>2 double beds</p>
                            </div>
                        </div>
                    </div>
                    <button class="button-primary btn-reverse">
                        <router-link to="/car"
                            >Book Two-Bedroom Suite</router-link
                        >
                    </button>
                </div>
                <div class="card">
                    <img
                        src="https://lamanhhotel.com/wp-content/uploads/2024/01/DSC05403-scaled.jpg"
                        alt=""
                    />
                    <div class="info">
                        <h1 class="name">Single-Bedroom Suite</h1>
                        <div class="facilities">
                            <div class="facility">
                                <img
                                    src="../assets/fonts/hotel/business-services.svg"
                                    alt="business services"
                                />
                                <p>
                                    Comfortable room with a single separate bed
                                </p>
                            </div>
                            <div class="facility">
                                <img
                                    src="../assets/fonts/hotel/swimming.svg"
                                    alt="sleep 4"
                                />
                                <p>Sleep 2 people</p>
                            </div>
                            <div class="facility">
                                <img
                                    src="../assets/fonts/hotel/top-rated.svg"
                                    alt="free wifi"
                                />
                                <p>1 double bed</p>
                            </div>
                        </div>
                    </div>
                    <button class="button-primary btn-reverse">
                        <router-link to="/car"
                            >Book Single-Bedroom Suite</router-link
                        >
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/hotelDetails.scss';
</style>
