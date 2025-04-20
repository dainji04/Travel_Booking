<script setup lang="ts">
import { authStore } from '@/stores/auth';

const useAuth = authStore();
const user = useAuth.user;
</script>

<template>
    <div class="profile">
        <div class="form">
            <h1>Profile</h1>
            <form>
                <div class="form-group">
                    <label for="name">Name</label>
                    <input :value="user?.name" type="text" id="name" />
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" :value="user?.email" />
                </div>
                <button type="submit" class="btn">Update</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/variables' as *;
.profile {
    width: 100%;
    .form {
        max-width: 400px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 15px;

        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }

        input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
    }

    .btn {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        text-align: center;

        &:hover {
            background-color: #0056b3;
        }
    }
}
</style>
