<script setup>
import Header from '@/components/Header.vue';
</script>

<template>
    <div>
        <Header />
        <main>
            <router-view />
        </main>
        <footer
            style="background-color: #000; height: 500px; margin-top: 100px"
        >
            Your Footer
        </footer>
    </div>
</template>
