<script setup lang="ts">
import { ref, onMounted } from 'vue';

const props = defineProps({
    isShow: {
        type: Boolean,
        default: false,
    },
    heading: {
        type: String,
        default: 'Notification',
    },
    content: {
        type: String,
        default:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur adipisci eum consequatur ipsam aut fugit molestiae corporis quaerat rem porro.',
    },
    status: {
        type: String,
        default: 'success',
    },
});

const isShow = props.isShow;
</script>

<template>
    <div class="notification" :class="{ show: isShow }">
        <div class="left">
            <img
                v-if="status === 'success'"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9sDRJRvcQEroYhiKVwUpkfrO_MPVpmmSQxg&s"
                alt=""
            />
            <img
                v-if="status === 'error'"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9C8XHg9I2Z4Evn4ly4OgjbtO0sm9Z4LJ3bQ&s"
                alt=""
            />
        </div>
        <div class="content">
            <h1>{{ heading }}</h1>
            <p>
                {{ content }}
            </p>
        </div>
        <div class="right" @click="isShow = false">
            <img src="@/assets/fonts/close.svg" alt="" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.notification {
    position: fixed;
    top: 30px;
    right: 30px;
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    z-index: 1000;
    background-color: #fff;
    box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.1),
        0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    border: 1px solid #ccc;
    padding: 20px 15px;
    transform: translateX(100%);
    transition: all 0.5s ease-in-out;
    opacity: 0;

    &.show {
        transform: translateX(0);
        opacity: 1;
    }

    .left {
        width: 50px;
        height: 50px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
    .content {
        width: 400px;
        display: flex;
        flex-direction: column;
        gap: 5px;

        h1 {
            font-size: 18px;
            font-weight: 600;
            color: #333;
        }
        p {
            font-size: 14px;
            font-weight: 400;
            color: #666;
        }
    }

    .right {
        width: 30px;
        height: 30px;
        cursor: pointer;

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
