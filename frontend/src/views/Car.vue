<!-- filepath: d:\workspace\Vue_Nest\frontend\src\views\Car.vue -->
<template>
    <div class="car-rental">
        <h1>Xe 4 Bánh</h1>
        <div class="car-grid">
            <div v-for="car in fourWheelerCars" :key="car.id" class="car-item">
                <img :src="car.image" :alt="car.name" class="car-image" />
                <h3>{{ car.name }}</h3>
                <p>Giá: {{ car.price }} VND</p>
                <button @click="rentCar(car)">Rent Now</button>
            </div>
        </div>

        <h1>Xe 2 Bánh</h1>
        <div class="car-grid">
            <div
                v-for="bike in twoWheelerBikes"
                :key="bike.id"
                class="car-item"
            >
                <img :src="bike.image" :alt="bike.name" class="car-image" />
                <h3>{{ bike.name }}</h3>
                <p>Giá: {{ bike.price }} VND</p>
                <button @click="rentCar(bike)">Rent Now</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const fourWheelerCars = ref([
    {
        id: 1,
        name: 'Xe 4 Chỗ',
        price: '500,000',
        image: 'https://xehoamai.com/storage/store/34//xehoamai/1-1.jpeg',
    },
    {
        id: 2,
        name: 'Xe 8 Chỗ',
        price: '800,000',
        image: 'https://thanhnien.mediacdn.vn/Uploaded/hongkyqc/2022_08_19/anh-2-4342.jpg',
    },
    {
        id: 3,
        name: 'Xe 16 Chỗ',
        price: '1,200,000',
        image: 'https://giaxefordsaigon.vn/wp-content/uploads/2023/01/xe-16-cho-ford-transit-21.jpg',
    },
    // Thêm các xe khác nếu cần
]);

const twoWheelerBikes = ref([
    {
        id: 1,
        name: 'Xe Tay Ga',
        price: '100,000',
        image: 'https://hondath.vn/storage/2024/06/Honda-Vario-125-ban-the-thao-mau-xanh-den-1.jpg',
    },
    {
        id: 2,
        name: 'Xe Số',
        price: '80,000',
        image: 'https://bizweb.dktcdn.net/100/501/269/products/wave125i-mam-trang-do.jpg?v=1701251398683',
    },
    {
        id: 3,
        name: 'Xe Côn',
        price: '150,000',
        image: 'https://yamaha-motor.com.vn/wp/wp-content/uploads/2024/01/XSR-155-Black-Metallic-004.png',
    },
    // Thêm các xe khác nếu cần
]);

function rentCar(vehicle: { name: string }) {
    alert(`Bạn đã chọn thuê: ${vehicle.name}`);
}
</script>
<style scoped>
.car-rental {
    padding: 20px;
    max-width: 1300px;
    margin: 0 auto;
}

h1 {
    margin-top: 20px;
    font-size: 24px;
    color: #333;
}

.car-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
}

.car-item {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.car-item:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.car-image {
    max-width: 100%;
    max-height: 250px; /* Giới hạn chiều cao của ảnh */
    height: auto;
    border-radius: 8px;
    object-fit: cover; /* Đảm bảo ảnh không bị méo */
}

h3 {
    font-size: 18px;
    color: #555;
    margin: 10px 0;
    height: 40px; /* Đặt chiều cao cố định để các tên nằm ngang hàng */
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden; /* Ẩn phần chữ nếu quá dài */
    text-overflow: ellipsis; /* Thêm dấu "..." nếu chữ quá dài */
    white-space: nowrap; /* Không cho phép xuống dòng */
}

p {
    margin: 5px 0;
    font-size: 16px;
    color: #666;
}

button {
    margin-top: 10px;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>
