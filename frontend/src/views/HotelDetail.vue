<script setup lang="ts">
const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
});
console.log(props.id);
</script>

<template>
    <div class="hotel-details">
        <div class="gallery">
            <div class="main-image">
                <img src="../assets/images/hotel.png" alt="Main Hotel Image" />
            </div>
            <div class="thumbnails">
                <img src="../assets/images/hotel.png" alt="Room" />
                <img src="../assets/images/hotel.png" alt="View" />
                <div class="more-images">
                    <div>+37 images</div>
                </div>
            </div>
        </div>
        <div class="tabs">
            <button class="active">Overview</button>
            <button>Rooms {{ props.id }}</button>
            <button>Guest Reviews</button>
        </div>
        <span class="line"></span>
        <div class="overview">
            <div class="left">
                <h1 class="title">Hotel du Parc Hanoi</h1>
                <div class="rating">
                    <span>⭐⭐⭐⭐</span>
                    <p>4.5 (22 reviews)</p>
                </div>
                <div class="description">
                    <p>Overview</p>
                    <p class="text">
                        Hôtel du Parc Hanoï offers a perfect blend of comfort,
                        convenience, and warm hospitality, making it a top
                        choice for travelers visiting Hanoi. With well-equipped
                        rooms featuring free WiFi, flat-screen TVs, and
                        minibars, guests can relax with ease. The hotel provides
                        room service, a swimming pool, a restaurant, and free
                        parking.
                        <br /><br />
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
                <img src="@/assets/images/hotel.png" alt="hotel cover" />
                <!-- <div class="info">
                    <p>explore the area</p>
                    <table>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div> -->
            </div>
        </div>

        <div class="availability">
            <h1>Available Room</h1>
            <div class="research-panel">
                <form class="research-form">
                    <div class="form-group">
                        <input type="date" id="dateStart" />
                    </div>
                    <div class="form-group">
                        <input type="date" id="dateEnd" />
                    </div>
                    <div class="form-group">
                        <input type="number" id="adults" min="1" value="1" />
                    </div>
                    <div class="form-group">
                        <input type="number" id="children" min="0" value="0" />
                    </div>
                    <button type="submit">Search</button>
                </form>
            </div>
            <div class="rooms">
                <template v-for="i in 3">
                    <div class="card">
                        <img src="../assets/images/hotel.png" alt="" />
                        <div class="info">
                            <h1 class="name">abc room</h1>
                            <div class="facilities">
                                <div class="facility">
                                    <img
                                        src="../assets/fonts/hotel/business-services.svg"
                                        alt="business services"
                                    />
                                    <p>
                                        A king-size bed or twin beds for a
                                        restful night’s sleep
                                    </p>
                                </div>
                                <div class="facility">
                                    <img
                                        src="../assets/fonts/hotel/swimming.svg"
                                        alt="sleep 3"
                                    />
                                    <p>Sleep 3</p>
                                </div>
                                <div class="facility">
                                    <img
                                        src="../assets/fonts/hotel/top-rated.svg"
                                        alt="free wifi"
                                    />
                                    <p>1 double bed and 1 twin bed</p>
                                </div>
                            </div>
                        </div>
                        <button class="button-primary btn-reverse">
                            Reverse suite
                        </button>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/hotelDetails.scss';
</style>
