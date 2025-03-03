<script setup>
import Header from '@/components/Header.vue';
</script>

<template>
    <div>
        <Header />
        <main>
            <router-view />
        </main>
        <footer>Your Footer</footer>
    </div>
</template>
