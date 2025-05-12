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
                <img src="../assets/images/hotel.png" alt="Pool" />
            </div>
        </div>
        <div class="tabs">
            <button class="active">Overview</button>
            <button>Rooms {{ props.id }}</button>
            <button>Guest Reviews</button>
        </div>
        <div class="overview">
            <h1>Hotel du Parc Hanoi</h1>
            <div class="rating">
                <span>⭐⭐⭐⭐</span>
                <small>4.5 (22 reviews)</small>
            </div>
            <p class="location">
                123 Luxury Street, Travel District, Melbourne, Australia
            </p>
            <p class="description">
                Hotel du Parc Hanoi offers a perfect blend of comfort,
                convenience, and warm hospitality, making it an ideal choice for
                travelers visiting Hanoi. The hotel offers spacious and
                elegantly furnished rooms, fine dining, and modern amenities in
                a peaceful setting.
            </p>
            <div class="features">
                <ul>
                    <li>Free WiFi</li>
                    <li>Air Conditioning</li>
                    <li>Parking available</li>
                    <li>Business Services</li>
                    <li>Swimming pool</li>
                    <li>Top-rated on reviews</li>
                </ul>
            </div>
            <div class="explore">
                <h3>Explore the area</h3>
                <ul>
                    <li>St Joseph's Cathedral - 1 min walk</li>
                    <li>Hoan Kiem Lake - 3 min walk</li>
                    <li>Old Quarter - 6 min walk</li>
                </ul>
            </div>
        </div>
        <div class="availability">
            <div class="filters">
                <input type="date" />
                <input type="date" />
                <select>
                    <option>2 adults, 1 room</option>
                </select>
                <button class="check-btn">Check Availability</button>
            </div>
            <div class="rooms">
                <div class="room">
                    <img
                        src="../assets/images/hotel.png"
                        alt="Executive Suite King"
                    />
                    <div class="info">
                        <h4>Executive Suite King</h4>
                        <ul>
                            <li>King-size bed</li>
                            <li>Spacious room with luxury bathroom</li>
                            <li>Includes breakfast</li>
                        </ul>
                        <button class="reserve">Reserve suite</button>
                    </div>
                </div>
                <div class="room">
                    <img
                        src="../assets/images/hotel.png"
                        alt="Deluxe Twin Bed"
                    />
                    <div class="info">
                        <h4>Deluxe Twin Bed</h4>
                        <ul>
                            <li>2 Single beds</li>
                            <li>Includes WiFi and breakfast</li>
                        </ul>
                        <button class="reserve">Reserve suite</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '../assets/scss/hotelDetails.scss';
</style>
