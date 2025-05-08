<script lang="ts" setup></script>

<template>
    <div class="not-found">
        <h1>404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <router-link to="/">Go back to Home</router-link>
    </div>
</template>

<style scoped lang="scss">
.not-found {
    text-align: center;
    margin-top: 50px;
}

.not-found h1 {
    font-size: 3rem;
    color: #ff6b6b;
}

.not-found p {
    font-size: 1.2rem;
    margin: 20px 0;
}

.not-found a {
    color: #3498db;
    text-decoration: none;
    font-weight: bold;
}

.not-found a:hover {
    text-decoration: underline;
}
</style>
